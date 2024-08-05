import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    checked?: boolean | Prisma.BoolNullableFilter<'Task'>,
  ): Promise<Task[]> {
    return await this.prisma.task.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        checked: checked !== undefined ? checked : {},
      },
    });
  }

  async findOne(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) throw new NotFoundException('Task Not Found');

    return task;
  }

  async createItem(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return await this.prisma.task.create({
      data: CreateTaskDto,
    });
  }

  async updateItem(id: number, UpdateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.prisma.task.update({
      where: { id },
      data: UpdateTaskDto,
    });
  }

  async deleteItem(id: number): Promise<Task> {
    return await this.prisma.task.delete({
      where: { id: id },
    });
  }
}
