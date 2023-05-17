import { TaskType } from '../entities/task';

export abstract class TaskGateway {
  abstract create(task: TaskType): Promise<TaskType | null>;
  abstract findByUserId(userId: string): Promise<TaskType[] | null>;
  abstract findById(taskId: string): Promise<TaskType | null>;
  abstract update(task: TaskType): Promise<TaskType>;
  abstract delete(taskId: string): Promise<void>;
}
