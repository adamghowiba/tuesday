import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Folder } from '@prisma/client';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OmitCreateDtoFields } from '../../types/helpers.type';

export class CreateFolderDto implements OmitCreateDtoFields<Folder> {
  @ApiPropertyOptional({type: Number})
  @IsNumber()
  @IsOptional()
  parent_folder_id!: number | null;

  @ApiProperty()
  @IsString()
  name!: string;
}
