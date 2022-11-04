import { ApiProperty } from '@nestjs/swagger';
import { Folder } from '@prisma/client';
import { IsString, Min } from 'class-validator';
import { OmitCreateDtoFields } from '../../types/helpers.type';

export class CreateFolderDto implements OmitCreateDtoFields<Folder> {
  @ApiProperty()
  @IsString()
  name!: string;
}
