import { Injectable } from '@nestjs/common';
import { UseCase } from '../gateways/UseCase';
import { UserGateway } from '../gateways/UserGateway';

@Injectable()
export class RefreshTokenUseCase implements UseCase {
  constructor(private userGateway: UserGateway) {}
  async execute(refresh_token: string) {
    const refreshToken = await this.userGateway.verifyRefreshToken(
      refresh_token,
    );

    return refreshToken;
  }
}
