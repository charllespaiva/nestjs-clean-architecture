import { Injectable } from '@nestjs/common';
import { UserGateway } from '../gateways/UserGateway';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { UseCase } from '@core/modules/user/gateways/UseCase';

@Injectable()
export class CheckIfEmailAlreayExistUseCase implements UseCase {
  constructor(
    private userGateway: UserGateway,
    private logger: LoggerGateway,
  ) {}

  async execute(email: string) {
    this.logger.Info('[init][usecase]', CheckIfEmailAlreayExistUseCase.name);
    this.logger.Debug('request', { email });

    const user = await this.userGateway.findEmail(email);

    this.logger.Debug('response', { user });
    this.logger.Info('[end][usecase]', CheckIfEmailAlreayExistUseCase.name);

    if (user) {
      return true;
    }

    return false;
  }
}
