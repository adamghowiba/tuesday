import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.prisma.board.create({ data: createBoardDto });

    return board;
  }

  async findAll() {
    const boards = await this.prisma.board.findMany({});

    return boards;
  }

  async findOne(boardId: number) {
    const board = await this.prisma.board.findUniqueOrThrow({
      where: { id: boardId },
    });

    return board;
  }

  async update(boardId: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.prisma.board.update({
      where: { id: boardId },
      data: updateBoardDto,
    });

    return board;
  }

  async remove(boardId: number) {
    const deletedBoard = await this.prisma.board.delete({where: {id: boardId}});

    return deletedBoard;
  }
}
