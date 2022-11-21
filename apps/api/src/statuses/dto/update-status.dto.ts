import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { CreateStatusDto } from './create-status.dto';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {}

export class BatchUpdateStatusData extends UpdateStatusDto {
  @ApiProperty()
  @IsNumber()
  id!: number;
}

export class BatchUpdateStatusDto {
  @ApiProperty({ type: BatchUpdateStatusData, isArray: true })
  @IsArray()
  @ValidateNested({each: true})
  @IsNotEmpty()
  @Type(() => BatchUpdateStatusData)
  data!: BatchUpdateStatusData[];
}
