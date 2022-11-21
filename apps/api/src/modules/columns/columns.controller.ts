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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';

@Controller()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiCreatedResponse({ type: ColumnEntity })
  @Post('boards/:boardId/columns')
  create(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() createColumnDto: CreateColumnDto
  ) {
    return this.columnsService.create({
      ...createColumnDto,
      board_id: boardId,
    });
  }

  @ApiOkResponse({ type: ColumnEntity, isArray: true })
  @Get('columns')
  findAll() {
    return this.columnsService.findAll();
  }

  @ApiOkResponse({ type: ColumnEntity })
  @Get('columns/:id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @ApiOkResponse({ type: ColumnEntity })
  @Patch('columns/:id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @ApiOkResponse({ type: ColumnEntity })
  @Delete('columns/:id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
