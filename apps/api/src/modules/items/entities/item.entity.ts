import { ApiProperty } from '@nestjs/swagger';
import { Item, Prisma } from '@prisma/client';
import { CreateItemDto } from '../dto/create-item.dto';

export class ItemEntity extends CreateItemDto implements Item {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: String })
  created_at!: Date;
}
