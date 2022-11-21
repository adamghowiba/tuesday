import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsBoolean,
  IsHexColor,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OmitCreateDtoFields } from '../../types/helpers.type';

export class CreateStatusDto implements OmitCreateDtoFields<Status> {
  @IsString()
  @ApiProperty()
  label!: string;

  @IsHexColor()
  @ApiProperty()
  color!: string;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  index!: number | null;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  board_id!: number;

  @IsOptional()
  @IsBoolean()
  is_default!: boolean;
}
