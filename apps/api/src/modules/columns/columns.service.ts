import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  async create(createColumnDto: CreateColumnDto) {
    const column = await this.prisma.column.create({ data: createColumnDto });

    return column;
  }

  async findAll() {
    const columns = await this.prisma.column.findMany({});

    return columns;
  }

  async findOne(columnId: number) {
    const column = await this.prisma.column.findUniqueOrThrow({
      where: { id: columnId },
    });

    return column;
  }

  async update(columnId: number, updateColumnDto: UpdateColumnDto) {
    const column = await this.prisma.column.update({
      where: { id: columnId },
      data: updateColumnDto,
    });

    return column;
  }

  async remove(columnId: number) {
    const column = await this.prisma.column.delete({ where: { id: columnId } });

    return column;
  }
}
