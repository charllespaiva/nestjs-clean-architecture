import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserBody, FindUserBody, SignInUserBody } from './dtos/UserDTO';
import { FindUserByIdUseCase } from '@core/modules/user/useCases/FindUserByIdUseCase';
import { UserPresenter } from '@app/presenters/UserPresenter';
import { CreateUserUseCase } from '@core/modules/user/useCases/CreateUserUseCase';
import { DeleteUserUseCase } from '@core/modules/user/useCases/DeleteUserUseCase';
import { UpdateUserUseCase } from '@core/modules/user/useCases/UpdateUserUseCase';
import { CheckIfEmailAlreayExistUseCase } from '@core/modules/user/useCases/CheckIfEmailAlreayExistUseCase';
import { GenerateTokenUseCase } from '@core/modules/user/useCases/GenerateTokenUseCase';
import { FindUserByEmailUseCase } from '@core/modules/user/useCases/FindUserByEmailUseCase';
import { AuthGuard } from '@app/guard/auth.guard';
import { GenerateRefreshTokenUseCase } from '@core/modules/user/useCases/GenerateRefreshTokenUseCase';
import { RefreshTokenUseCase } from '@core/modules/user/useCases/RefreshTokenUseCase';
import * as dayjs from 'dayjs';
import { DeleteRefreshTokenUseCase } from '@core/modules/user/useCases/DeleteRefreshTokenUseCase';

@Controller('users')
export class UserController {
  constructor(
    private findByIdUseCase: FindUserByIdUseCase,
    private createUseCase: CreateUserUseCase,
    private deleteUseCase: DeleteUserUseCase,
    private updateUseCase: UpdateUserUseCase,
    private checkIfEmailAlreayExistUseCase: CheckIfEmailAlreayExistUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private generateTokenUseCase: GenerateTokenUseCase,
    private generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private deleteRefreshTokenUseCase: DeleteRefreshTokenUseCase,
  ) {}

  @Post('/refresh-token')
  async refreshToken(@Body() body: { refresh_token: string }, @Res() response) {
    const { refresh_token } = body;

    const refreshToken = await this.refreshTokenUseCase.execute(refresh_token);

    if (!refreshToken) {
      return response.status(HttpStatus.CONFLICT).send({
        error: HttpStatus.BAD_REQUEST,
        message: 'Refresh token invalid',
      });
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    );

    const token = await this.generateTokenUseCase.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await this.deleteRefreshTokenUseCase.execute(refreshToken.userId);

      const generatedRefreshToken =
        await this.generateRefreshTokenUseCase.execute(refreshToken.userId);

      return response.send({ token, refresh_token: generatedRefreshToken });
    }

    return response.send({ token });
  }

  @Post('/signin')
  async signin(@Body() body: SignInUserBody, @Res() response) {
    try {
      const userAccount = await this.findUserByEmailUseCase.execute(body.email);

      if (!userAccount) {
        return response.status(HttpStatus.CONFLICT).send({
          error: HttpStatus.CONFLICT,
          message: 'Email or password incorrect',
        });
      }

      const passwordMatch = body.password === userAccount.password; //await compare(body.password, userAccount.password);

      if (!passwordMatch) {
        return response.status(HttpStatus.CONFLICT).send({
          error: HttpStatus.CONFLICT,
          message: 'Email or password incorrect',
        });
      }

      const token = await this.generateTokenUseCase.execute(userAccount.id);

      const refreshToken = await this.generateRefreshTokenUseCase.execute(
        userAccount.id,
      );

      if (!token) {
        return response.status(HttpStatus.BAD_REQUEST).send();
      }

      return response.send({ token, refreshToken });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Post()
  async create(@Body() body: CreateUserBody, @Res() response) {
    try {
      const emailAlreadyExists =
        await this.checkIfEmailAlreayExistUseCase.execute(body.email);

      if (emailAlreadyExists) {
        return response.status(HttpStatus.CONFLICT).send({
          error: HttpStatus.CONFLICT,
          message: 'This email is already registered',
        });
      }

      const user = await this.createUseCase.execute(body);

      if (!user) {
        return response.status(HttpStatus.BAD_REQUEST).send();
      }

      return response.send({
        data: UserPresenter.toHTTP(user),
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findById(@Param() params: FindUserBody, @Res() response) {
    const user = await this.findByIdUseCase.execute({
      id: params.id,
    });

    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).send({ user });
    }

    return response.send({
      data: UserPresenter.toHTTP(user),
    });
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async patch(@Param() params, @Body() body, @Res() response) {
    const user = await this.updateUseCase.execute({
      id: params.id,
      ...body,
    });

    return response.send({
      data: UserPresenter.toHTTP(user),
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param() params, @Res() response) {
    await this.deleteUseCase.execute(params);

    return response.status(HttpStatus.ACCEPTED).send();
  }
}
