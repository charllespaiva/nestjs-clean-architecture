import { Injectable } from '@nestjs/common';
import { UserGateway } from '../gateways/UserGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/task/gateways/UseCase';
import { User } from '../entities/user';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase implements UseCase {
  constructor(
    private userGateway: UserGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: CreateUserRequest) {
    this.logger.Info('[init][usecase]', CreateUserUseCase.name);
    this.logger.Debug('request', { request });

    const { name, email, password } = request;

    const user = new User({ name, email, password });
    const response = await this.userGateway.create(user);

    this.logger.Debug('response', { response });
    this.logger.Info('[end][usecase]', CreateUserUseCase.name);

    return response;
  }
}
