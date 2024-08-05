import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ParseIntPipe } from '@nestjs/common';

import { parseChecked } from 'src/utils/parsingCheck.util';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get() // GET tasks or /tasks?checked=value
  findAll(@Query('checked') checked?: string) {
    const formatChecked = parseChecked(checked);
    return this.tasksService.findAll(formatChecked);
  }

  @Get(':id') // GET /tasks/:id
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post() // POST /tasks
  create(@Body() task: { item: string; checked: boolean }) {
    return this.tasksService.createItem(task);
  }

  @Patch(':id') // PATCH /tasks/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskUpdate: { item: string; checked: boolean },
  ) {
    return this.tasksService.updateItem(id, taskUpdate);
  }

  @Delete(':id') // DELETE /tasks/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteItem(id);
  }
}
