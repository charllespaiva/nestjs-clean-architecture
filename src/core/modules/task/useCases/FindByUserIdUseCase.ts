import { Injectable } from '@nestjs/common';
import { TaskGateway } from '../gateways/TaskGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/task/gateways/UseCase';

interface FindByIdTaskRequest {
  userId: string;
}

@Injectable()
export class FindTaskByUserIdUseCase implements UseCase {
  constructor(
    private taskGateway: TaskGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: FindByIdTaskRequest) {
    this.logger.Info('[init][usecase]', FindTaskByUserIdUseCase.name);
    this.logger.Debug('request', { request });

    const { userId } = request;
    const tasks = await this.taskGateway.findByUserId(userId);

    this.logger.Debug('response', { tasks });
    this.logger.Info('[end][usecase]', FindTaskByUserIdUseCase.name);

    return tasks;
  }
}
