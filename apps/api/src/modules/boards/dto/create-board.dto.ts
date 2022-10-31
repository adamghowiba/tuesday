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
  @ApiPropertyOptional({type: Boolean})
  is_favorite!: boolean | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({type: String})
  description!: string | null;
}
