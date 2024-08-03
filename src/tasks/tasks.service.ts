import { Injectable } from '@nestjs/common';
import { task } from '../database/schema';
import { DrizzleService } from '../database/drizzle.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class TasksService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll(checked?: boolean) {
    const { db } = this.drizzleService;
    let query = db.select().from(task);
    if (checked) {
      query = query.where(eq(task.checked, checked));
    }

    const result = await query.execute();
    return result;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    return task;
  }

  create(task: { id: number; item: string; checked: boolean }) {}
}
