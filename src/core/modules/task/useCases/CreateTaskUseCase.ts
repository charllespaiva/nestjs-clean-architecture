import { Injectable } from '@nestjs/common';
import { TaskGateway } from '../gateways/TaskGateway';
import { Task } from '@core/modules/task/entities/task';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/task/gateways/UseCase';

interface CreateTaskRequest {
  title: string;
  userId: string;
}

@Injectable()
export class CreateTaskUseCase implements UseCase {
  constructor(
    private taskGateway: TaskGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: CreateTaskRequest) {
    this.logger.Info('[init][usecase]', CreateTaskUseCase.name);
    this.logger.Debug('request', { request });

    const { title, userId } = request;
    const task = new Task({ title, userId });
    const response = await this.taskGateway.create(task);

    this.logger.Debug('response', { response });
    this.logger.Info('[end][usecase]', CreateTaskUseCase.name);

    return response;
  }
}
