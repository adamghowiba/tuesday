import { ApiProperty } from "@nestjs/swagger";
import { Item, Prisma } from "@prisma/client";
import { IsNumber, IsObject, IsString } from "class-validator";
import { OmitCreateDtoFields } from "../../../types/helpers.type";

export class CreateItemDto implements OmitCreateDtoFields<Item> {
  @IsString()
  @ApiProperty()
  name!: string;

  @ApiProperty()
  @IsObject()
  column_values!: any;

  @IsNumber()
  @ApiProperty()
  board_id!: number | null;
}
