import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ItemEntity } from './entities/item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiCreatedResponse({type: ItemEntity})
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @ApiOkResponse({type: ItemEntity, isArray: true})
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @ApiOkResponse({type: ItemEntity})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(+id);
  }

  @ApiOkResponse({type: ItemEntity})
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @ApiOkResponse({type: ItemEntity})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(+id);
  }
}
