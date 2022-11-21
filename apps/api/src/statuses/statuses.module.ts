import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { PrismaService } from '../common/services/database/prisma.service';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService, PrismaService],
})
export class StatusesModule {}
