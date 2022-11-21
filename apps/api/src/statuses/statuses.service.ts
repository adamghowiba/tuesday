import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { filterKeys } from '@tuesday/utils';
import { PrismaService } from '../common/services/database/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { BatchUpdateStatusDto, UpdateStatusDto } from './dto/update-status.dto';

interface ListStatusParams {
  filter?: Prisma.StatusWhereInput;
}

@Injectable()
export class StatusesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStatusDto: CreateStatusDto) {
    const status = await this.prisma.status.create({ data: createStatusDto });

    return status;
  }

  async findAll(params?: ListStatusParams) {
    const statuses = await this.prisma.status.findMany({
      where: params?.filter,
    });

    return statuses;
  }

  async findOne(statusId: number) {
    const status = await this.prisma.status.findUniqueOrThrow({
      where: { id: statusId },
    });

    return status;
  }

  async update(statusId: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.prisma.status.update({
      where: { id: statusId },
      data: updateStatusDto,
    });

    return status;
  }

  async updateMany(batchUpdateStatusDto: BatchUpdateStatusDto) {
    const updatedStatuses = await this.prisma.$transaction(
      batchUpdateStatusDto.data.map((status) =>
        this.prisma.status.update({
          where: { id: status.id },
          data: filterKeys(status, ["id"]),
        })
      )
    );

    return updatedStatuses;
  }

  async remove(statusId: number) {
    const removedStatus = await this.prisma.status.delete({
      where: { id: statusId },
    });

    return removedStatus;
  }
}
