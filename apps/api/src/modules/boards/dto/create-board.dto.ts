import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Board, BoardStatus, BoardType } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { OmitCreateDtoFields } from '../../../types/helpers.type';

export class CreateBoardDto implements OmitCreateDtoFields<Board> {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ type: Boolean })
  is_favorite!: boolean | null;

  @IsEnum({ type: BoardStatus })
  @ApiPropertyOptional({enum: BoardType})
  @IsOptional()
  status!: BoardStatus;

  @IsEnum({ type: BoardType })
  @ApiPropertyOptional({enum: BoardType})
  @IsOptional()
  type!: BoardType;

  @IsOptional()
  @ApiPropertyOptional({ type: String })
  @IsString()
  folder_id!: number | null;

  // Currently not in use, but needs to be implemented.
  /*   @ApiProperty({ type: CreateColumnDto, isArray: true })
  @IsObject({each: true})
  columns!: CreateColumnDto[]; */

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  description!: string | null;
}
