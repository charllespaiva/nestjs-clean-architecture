import { TaskType as Task } from '@core/modules/task/entities/task';
import { TaskGateway } from '@core/modules/task/gateways/TaskGateway';
import { PrismaClient } from '@prisma/client';

export class TaskPrismaAdapter implements TaskGateway {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  create(task: Task): Promise<any> {
    const response = this.prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        userId: task.userId,
      },
    });

    return response;
  }
  async findByUserId(userId: string): Promise<Task[] | null> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });

    if (!tasks) {
      return null;
    }

    return tasks;
  }

  async findById(taskId: string): Promise<Task | any> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    return task;
  }
  async update(task: Task): Promise<Task> {
    const data = await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        title: task.title,
      },
    });

    return data;
  }
  async delete(taskId: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
