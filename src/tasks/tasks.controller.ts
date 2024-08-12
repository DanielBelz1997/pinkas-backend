import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { Task } from '@prisma/client';
// import { Throttle, SkipThrottle } from '@nestjs/throttler';

import { parseChecked } from 'src/utils/parsingCheck.util';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// SkipThrottle(); for skipping the rate limiting rules of all the requests in the controller
@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  private readonly logger = new MyLoggerService(TasksController.name);
  // @Throttle({ short: { ttl: 1000, limit: 1 } }); with this you can use a option for rate limiting and
  // overwrite it like we did here.
  @Get() // GET tasks or /tasks?checked=value
  findAll(@Ip() ip: string, @Query('checked') checked?: string) {
    this.logger.log(`Request for all Tasks\t${ip}`, TasksController.name);
    const formatChecked = parseChecked(checked);
    return this.tasksService.findAll(formatChecked);
  }

  // @SkipThrottle({ default: true }); if we adding skip to all the controller like shown above, we
  // can add the Throttle to this specific route, so it would rate limit it.
  @Get(':id') // GET /tasks/:id
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post() // POST /tasks
  create(@Body(ValidationPipe) CreateTaskDto: Task) {
    return this.tasksService.createItem(CreateTaskDto);
  }

  @Patch(':id') // PATCH /tasks/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) UpdateTaskDto: Task,
  ) {
    return this.tasksService.updateItem(id, UpdateTaskDto);
  }

  @Delete(':id') // DELETE /tasks/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteItem(id);
  }
}
