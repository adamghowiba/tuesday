import { ApiProperty } from '@nestjs/swagger';
import { Board } from '@prisma/client';
import { FolderEntity } from '../../../folders/entities/folder.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';
import { ItemEntity } from '../../items/entities/item.entity';
import { CreateBoardDto } from '../dto/create-board.dto';

export class BoardEntity extends CreateBoardDto implements Board {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: String })
  created_at!: Date;

  @ApiProperty({ type: FolderEntity })
  folder!: FolderEntity | null;

  @ApiProperty({ type: ColumnEntity, isArray: true })
  columns?: ColumnEntity[];

  @ApiProperty({ type: ItemEntity, isArray: true })
  items?: ItemEntity[];
}
