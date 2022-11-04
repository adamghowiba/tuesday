import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const item = await this.prisma.item.create({ data: createItemDto });

    return item;
  }

  async findAll() {
    const items = await this.prisma.item.findMany({});

    return items;
  }

  async findOne(itemId: number) {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });

    return item;
  }

  /* TODO: Should we check if the board actually has the column? */
  async update(itemId: number, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: { id: itemId },
    });

    let itemColumnValues: any = undefined;
    if (updateItemDto.column_values && typeof item.column_values === 'object') {
      itemColumnValues = {
        ...item.column_values,
        ...updateItemDto.column_values,
      };
    }

    const updatedItem = await this.prisma.item.update({
      where: { id: itemId },
      data: { ...updateItemDto, column_values: itemColumnValues },
    });

    return updatedItem;
  }

  async remove(itemId: number) {
    const item = await this.prisma.item.delete({ where: { id: itemId } });

    return item;
  }
}
