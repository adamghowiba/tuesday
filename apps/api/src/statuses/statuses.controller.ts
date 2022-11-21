import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { BatchUpdateStatusDto, UpdateStatusDto } from './dto/update-status.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatusEntity } from './entities/status.entity';

@ApiTags('Statuses')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @ApiOkResponse({ type: StatusEntity })
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusesService.create(createStatusDto);
  }

  @ApiOkResponse({ type: StatusEntity, isArray: true })
  @Get()
  findAll() {
    return this.statusesService.findAll();
  }

  @ApiOkResponse({ type: StatusEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusesService.findOne(+id);
  }

  @Patch('/batch')
  @ApiBody({ type: BatchUpdateStatusDto })
  updateBatch(@Body() batchUpdateStatusDto: BatchUpdateStatusDto) {
    return this.statusesService.updateMany(batchUpdateStatusDto);
  }

  @ApiOkResponse({ type: StatusEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusesService.update(+id, updateStatusDto);
  }

  @ApiOkResponse({ type: StatusEntity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusesService.remove(+id);
  }
}
