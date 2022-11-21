import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
/* TODO: Implement Schema in which to create boards from. This will prefill data based on baord type. IE Marketing Project, Development */
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.prisma.board.create({
      data: {
        ...createBoardDto,
        groups: {
          create: [
            {
              color: '#A25DDC',
              title: 'Tasks',
              items: {
                create: [
                  { name: 'Task #1', column_values: {} },
                  { name: 'Task #2', column_values: {} },
                ],
              },
            },
          ],
        },
        statuses: {
          createMany: {
            data: [
              { color: '#FDAB3D', label: 'Working on it' },
              { color: '#E2445C', label: 'Stuck' },
              { color: '#00C875', label: 'Done' },
              { color: '#C4C4C4', label: '' },
            ],
          },
        },
      },
    });

    return board;
  }

  async findAll() {
    const boards = await this.prisma.board.findMany({
      include: { folder: true, statuses: true },
    });

    return boards;
  }

  async findOne(boardId: number): Promise<BoardEntity> {
    const board = await this.prisma.board.findUniqueOrThrow({
      where: { id: boardId },
      include: {
        columns: { orderBy: { created_at: 'asc' } },
        items: { orderBy: { created_at: 'asc' } },
        folder: true,
        statuses: true,
        groups: {
          include: {
            items: { orderBy: { created_at: 'asc' } },
          },
        },
      },
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
    const deletedBoard = await this.prisma.board.delete({
      where: { id: boardId },
    });

    return deletedBoard;
  }
}
