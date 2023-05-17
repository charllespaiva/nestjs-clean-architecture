import { Injectable } from '@nestjs/common';
import { UserGateway } from '../gateways/UserGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/user/gateways/UseCase';

interface FindByIduserRequest {
  id: string;
}

@Injectable()
export class FindUserByIdUseCase implements UseCase {
  constructor(
    private userGateway: UserGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: FindByIduserRequest) {
    this.logger.Info('[init][usecase]', FindUserByIdUseCase.name);
    this.logger.Debug('request', { request });

    const { id } = request;

    const users = await this.userGateway.findById(id);

    this.logger.Debug('response', { users });
    this.logger.Info('[end][usecase]', FindUserByIdUseCase.name);

    return users;
  }
}
