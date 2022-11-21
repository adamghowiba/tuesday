import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

interface ListParams {
  boardId: number;
  filters?: Prisma.GroupWhereInput;
}

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(boardId: number, createGroupDto: CreateGroupDto) {
    const group = await this.prisma.group.create({
      data: { ...createGroupDto, board_id: boardId },
    });

    return group;
  }

  async list(params: ListParams) {
    const groups = await this.prisma.group.findMany({
      where: { board_id: params.boardId, ...params.filters },
    });

    return groups;
  }

  async retrive(id: number) {
    const group = await this.prisma.group.findUnique({ where: { id } });

    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.prisma.group.update({
      where: { id },
      data: updateGroupDto,
    });

    return group;
  }

  async remove(id: number) {
    const deletedGroup = await this.prisma.group.delete({ where: { id } });

    return deletedGroup;
  }
}
