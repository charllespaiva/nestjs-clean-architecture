import { Injectable } from '@nestjs/common';
import { TaskGateway } from '../gateways/TaskGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/task/gateways/UseCase';

interface DeleteTaskRequest {
  id: string;
}

@Injectable()
export class DeleteTaskUseCase implements UseCase {
  constructor(
    private taskGateway: TaskGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: DeleteTaskRequest) {
    this.logger.Info('[init][usecase]', DeleteTaskUseCase.name);
    this.logger.Debug('request', { request });

    const { id } = request;
    const response = await this.taskGateway.delete(id);

    this.logger.Debug('response', { response });
    this.logger.Info('[end][usecase]', DeleteTaskUseCase.name);
  }
}
