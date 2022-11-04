import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Item } from "@prisma/client";
import { IsNumber, IsObject, IsString } from "class-validator";
import { OmitCreateDtoFields } from "../../../types/helpers.type";

export class CreateItemDto implements OmitCreateDtoFields<Item> {
  @IsString()
  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  @IsObject()
  column_values: any = {};

  @IsNumber()
  @ApiProperty()
  board_id!: number | null;
}
