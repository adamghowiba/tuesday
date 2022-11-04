import { ApiProperty } from '@nestjs/swagger';
import { Column } from '@prisma/client';
import { CreateColumnDto } from '../dto/create-column.dto';

export class ColumnEntity extends CreateColumnDto implements Column {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: String })
  created_at!: Date;
}
