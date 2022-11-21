import { ApiProperty } from '@nestjs/swagger';
import { Group } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { ItemEntity } from '../../items/entities/item.entity';
import { CreateGroupDto } from '../dto/create-group.dto';

export class GroupsEntity extends CreateGroupDto implements Group {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: ItemEntity, isArray: true })
  items!: ItemEntity[];

  @ApiProperty()
  board_id!: number;
}
