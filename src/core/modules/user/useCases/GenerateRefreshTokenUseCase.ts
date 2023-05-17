import { Injectable } from '@nestjs/common';
import { UseCase } from '../gateways/UseCase';
import { UserGateway } from '../gateways/UserGateway';

@Injectable()
export class GenerateRefreshTokenUseCase implements UseCase {
  constructor(private userGateway: UserGateway) {}
  async execute(userId: string) {
    return await this.userGateway.refreshToken(userId);
  }
}
