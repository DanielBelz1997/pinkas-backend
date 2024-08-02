import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    { id: 1, name: 'tomato', checked: true },
    { id: 2, name: 'chips', checked: false },
    { id: 3, name: 'salt', checked: true },
    { id: 4, name: 'pita', checked: false },
  ];

  findAll(checked?: boolean) {
    if (checked) {
      return this.tasks.filter((task) => task.checked === true);
    }

    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    return task;
  }
}
