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

@Controller('tasks')
export class TasksController {
  @Get() // GET tasks or /tasks?checked=value
  findAll(@Query('checked') checked?: boolean) {
    return [];
  }

  @Get(':id') // GET /tasks/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post() // POST /tasks
  create(@Body() task: { id: string; name: string; checked: boolean }) {
    return task;
  }

  @Patch(':id') // PATCH /tasks/:id
  update(@Param('id') id: string, @Body() taskUpdate: {}) {
    return { id, ...taskUpdate };
  }

  @Delete(':id') // DELETE /tasks/:id
  delete(@Param('id') id: string) {
    return { id };
  }
}
