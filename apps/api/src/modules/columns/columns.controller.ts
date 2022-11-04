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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

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

  @Get('columns')
  findAll() {
    return this.columnsService.findAll();
  }

  @Get('columns/:id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(+id);
  }

  @Patch('columns/:id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @Delete('columns/:id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(+id);
  }
}
