import { CreateFolderDto } from '../dto/create-folder.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Folder } from '@prisma/client';

export class FolderEntity
  extends OmitType(CreateFolderDto, [])
  implements Folder
{
  @ApiProperty()
  parent_folder_id!: number | null;

  @ApiProperty()
  id!: number;
}
