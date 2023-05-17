import { Injectable } from '@nestjs/common';
import { TaskGateway } from '../gateways/TaskGateway';
import { Task } from '@core/modules/task/entities/task';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/task/gateways/UseCase';

interface UpdateTaskRequest {
  id: string;
  title: string;
}

@Injectable()
export class UpdateTaskUseCase implements UseCase {
  constructor(
    private taskGateway: TaskGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: UpdateTaskRequest) {
    this.logger.Info('[init][usecase]', UpdateTaskUseCase.name);
    this.logger.Debug('request', { request });

    const { id, title } = request;
    const taskSelected = await this.taskGateway.findById(id);

    const task = new Task({
      id: taskSelected.id,
      title,
      userId: taskSelected.userId,
    });

    const response = await this.taskGateway.update(task);

    this.logger.Debug('response', { response });
    this.logger.Info('[end][usecase]', UpdateTaskUseCase.name);

    return response;
  }
}
