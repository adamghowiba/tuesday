import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { PrismaService } from '../../common/services/database/prisma.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService, PrismaService],
})
export class ColumnsModule {}
