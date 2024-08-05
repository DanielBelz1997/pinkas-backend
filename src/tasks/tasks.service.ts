import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    checked?: boolean | Prisma.BoolNullableFilter<'Task'>,
  ): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        checked: checked !== undefined ? checked : {},
      },
    });
  }

  async findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id: id },
    });
  }

  async createItem(task: { item: string; checked: boolean }): Promise<Task> {
    return this.prisma.task.create({
      data: task,
    });
  }

  async updateItem(
    id: number,
    taskUpdate: { item: string; checked: boolean },
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: taskUpdate,
    });
  }

  async deleteItem(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id: id },
    });
  }
}
