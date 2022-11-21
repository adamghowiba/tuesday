import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BoardEntity } from '../boards/entities/board.entity';
import { GroupsEntity } from './entities/group.entity';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiCreatedResponse({ type: GroupsEntity })
  @Post('boards/:boardId/groups')
  create(
    @Body() createGroupDto: CreateGroupDto,
    @Param('boardId', ParseIntPipe) boardId: number
  ) {
    return this.groupsService.create(boardId, createGroupDto);
  }

  @ApiOkResponse({ type: GroupsEntity, isArray: true })
  @Get('boards/:boardId/groups')
  list(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.groupsService.list({ boardId });
  }

  @ApiOkResponse({ type: GroupsEntity })
  @Get('groups/:id')
  retrive(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.retrive(+id);
  }

  @ApiOkResponse({ type: GroupsEntity })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto
  ) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @ApiOkResponse({ type: GroupsEntity })
  @Delete('groups/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(+id);
  }
}
