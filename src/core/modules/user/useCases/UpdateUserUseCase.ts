import { Injectable } from '@nestjs/common';
import { UserGateway } from '../gateways/UserGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/task/gateways/UseCase';
import { User } from '../entities/user';

interface UpdateTaskRequest {
  id: string;
  name: string;
  password: string;
}

@Injectable()
export class UpdateUserUseCase implements UseCase {
  constructor(
    private userGateway: UserGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: UpdateTaskRequest) {
    this.logger.Info('[init][usecase]', UpdateUserUseCase.name);
    this.logger.Debug('request', { request });

    const { id, name, password } = request;
    const user = await this.userGateway.findById(id);

    const task = new User({
      id: user.id,
      ...user,
      name,
      password,
    });

    const response = await this.userGateway.update(task);

    this.logger.Debug('response', { response });
    this.logger.Info('[end][usecase]', UpdateUserUseCase.name);

    return response;
  }
}
