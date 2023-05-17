import { TaskType as Task } from '@core/modules/task/entities/task';

export class TaskPresenter {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title,
      userId: task.userId,
    };
  }
}
