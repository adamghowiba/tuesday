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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiCreatedResponse({ type: BoardEntity})
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @ApiOkResponse({ type: BoardEntity, isArray: true  })
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOkResponse({ type: BoardEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.findOne(id);
  }

  @ApiOkResponse({ type: BoardEntity })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @ApiOkResponse({ type: BoardEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.remove(id);
  }
}
