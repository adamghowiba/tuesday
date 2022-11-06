import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, ColumnType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OmitCreateDtoFields } from '../../../types/helpers.type';
import { Transform } from 'class-transformer';

export class CreateColumnDto implements OmitCreateDtoFields<Column> {
  @IsEnum(ColumnType, {
    message(params) {
      console.log(params);
      return `Property ${params.property} must be of type [${params.constraints
        .map((constraint) =>
          Object.values(constraint).map((value) => String(value).toLowerCase())
        )
        .join(', ')}]`;
    },
  })
  @Transform((param) => String(param.value).toUpperCase())
  @ApiProperty({ enum: ColumnType })
  type!: ColumnType;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  description!: string | null;

  board_id!: number;
}
