import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { OmitCreateDtoFields } from '../../../types/helpers.type';

export class CreateItemDto implements OmitCreateDtoFields<Item> {
  @IsString()
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  @IsObject()
  column_values: any = {};

  @IsNumber()
  @ApiProperty({ type: Number })
  board_id!: number | null;

  @ApiProperty({type: Number})
  @IsOptional()
  @IsNumber()
  group_id!: number | null;
}
