import { Task, TaskType } from '@core/modules/task/entities/task';
import { TaskGateway } from '@core/modules/task/gateways/TaskGateway';

export class TaskInMemoryAdapter implements TaskGateway {
  private tasks: TaskType[] = [];

  async create(task: any): Promise<TaskType> {
    const newTask = new Task(task);
    this.tasks.push(newTask);
    return task;
  }

  async findById(taskId: string): Promise<TaskType> {
    return this.tasks.find((task) => task.id === taskId);
  }

  async findByUserId(userId: string): Promise<TaskType[]> {
    return this.tasks.filter((task) => task.userId === userId);
  }

  async update(task: TaskType): Promise<TaskType> {
    const taskIndex = this.tasks.findIndex(
      (taskItem) => taskItem.id === task.id,
    );

    this.tasks[taskIndex] = task;

    return task;
  }

  async delete(taskId: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(
      (taskItem) => taskItem.id === taskId,
    );

    delete this.tasks[taskIndex];
  }
}
