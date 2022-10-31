import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor (private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const item = await this.prisma.item.create({data: createItemDto});

    return item;
  }

  async findAll() {
    const items = await this.prisma.item.findMany({});

    return items;
  }

  async findOne(itemId: number) {
    const item = await this.prisma.item.findUnique({where: {id: itemId}})

    return item;
  }

  async update(itemId: number, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.item.update({where: {id: itemId}, data: updateItemDto});

    return item;
  }

  async remove(itemId: number) {
    const item = await this.prisma.item.delete({where: {id: itemId}})

    return item;
  }
}
