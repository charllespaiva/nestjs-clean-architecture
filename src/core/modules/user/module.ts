import { Module } from '@nestjs/common';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { SignaleLoggerAdapter } from '@app/adapters/logger/SignaleLoggerAdapter';
import { UserGateway } from './gateways/UserGateway';
import { FindUserByIdUseCase } from './useCases/FindUserByIdUseCase';
import { UserPrismaAdapter } from '@app/adapters/user/UserPrismaAdapter';
import { UserController } from '@app/controllers/user.controller';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { DeleteUserUseCase } from './useCases/DeleteUserUseCase';
import { UpdateUserUseCase } from './useCases/UpdateUserUseCase';
import { CheckIfEmailAlreayExistUseCase } from './useCases/CheckIfEmailAlreayExistUseCase';
import { GenerateTokenUseCase } from './useCases/GenerateTokenUseCase';
import { FindUserByEmailUseCase } from './useCases/FindUserByEmailUseCase';
import { GenerateRefreshTokenUseCase } from './useCases/GenerateRefreshTokenUseCase';
import { RefreshTokenUseCase } from './useCases/RefreshTokenUseCase';
import { DeleteRefreshTokenUseCase } from './useCases/DeleteRefreshTokenUseCase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    FindUserByIdUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    CheckIfEmailAlreayExistUseCase,
    FindUserByEmailUseCase,
    GenerateTokenUseCase,
    GenerateRefreshTokenUseCase,
    RefreshTokenUseCase,
    DeleteRefreshTokenUseCase,
    {
      provide: UserGateway,
      useClass: UserPrismaAdapter,
    },
    {
      provide: LoggerGateway,
      useClass: SignaleLoggerAdapter,
    },
  ],
  exports: [UserGateway],
})
export class UserModule {}
