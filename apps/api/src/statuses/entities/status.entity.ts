import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { CreateStatusDto } from '../dto/create-status.dto';

export class StatusEntity extends CreateStatusDto implements Status {
  @ApiProperty()
  id!: number;

  @ApiProperty({type: String})
  created_at!: Date;
}
