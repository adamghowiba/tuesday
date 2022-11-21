import { ApiProperty } from '@nestjs/swagger';
import { Group } from '@prisma/client';
import { IsString } from 'class-validator';
import type { OmitCreateDtoFields } from '../../../types/helpers.type';

export class CreateGroupDto
  implements Omit<OmitCreateDtoFields<Group>, 'title' | 'board_id'>
{
  @ApiProperty()
  @IsString()
  color!: string;

  @ApiProperty()
  @IsString()
  title!: string;
}
