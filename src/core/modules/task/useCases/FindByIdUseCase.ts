import { Injectable } from '@nestjs/common';
import { TaskGateway } from '../gateways/TaskGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/task/gateways/UseCase';

interface FindByIdTaskRequest {
  id: string;
}

@Injectable()
export class FindTaskByIdUseCase implements UseCase {
  constructor(
    private taskGateway: TaskGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: FindByIdTaskRequest) {
    this.logger.Info('[init][usecase]', FindTaskByIdUseCase.name);
    this.logger.Debug('request', { request });

    const { id } = request;

    const tasks = await this.taskGateway.findById(id);

    this.logger.Debug('response', { tasks });
    this.logger.Info('[end][usecase]', FindTaskByIdUseCase.name);

    return tasks;
  }
}
