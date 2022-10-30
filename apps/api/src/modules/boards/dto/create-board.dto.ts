import { Board } from '@prisma/client';
import { OmitCreateDtoFields } from '../../../types/helpers.type';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBoardDto implements OmitCreateDtoFields<Board> {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  is_favorite!: boolean;

  @IsString({each: true})
  @IsOptional()
  @ApiProperty()
  activatedViews!: string[];
}
