import { Injectable } from '@nestjs/common';
import { UserGateway } from '../gateways/UserGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/user/gateways/UseCase';

interface DeleteRequest {
  id: string;
}

@Injectable()
export class DeleteUserUseCase implements UseCase {
  constructor(
    private userGateway: UserGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(request: DeleteRequest) {
    this.logger.Info('[init][usecase]', DeleteUserUseCase.name);
    this.logger.Debug('request', { request });

    const { id } = request;
    const response = await this.userGateway.delete(id);

    this.logger.Debug('response', { response });
    this.logger.Info('[end][usecase]', DeleteUserUseCase.name);
  }
}
