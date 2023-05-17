import { UserType as User } from '@core/modules/user/entities/user';
import { UserGateway } from '@core/modules/user/gateways/UserGateway';
import { PrismaClient, RefreshToken } from '@prisma/client';
import * as dayjs from 'dayjs';

export class UserPrismaAdapter implements UserGateway {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  create(user: User): Promise<any> {
    const response = this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return response;
  }

  async findById(userId: string): Promise<User | any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async update(user: User): Promise<User> {
    const data = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        password: user.password,
      },
    });

    return data;
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async refreshToken(userId: string): Promise<any> {
    const expiresIn = dayjs().add(15, 'second').unix();
    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return refreshToken;
  }

  async verifyRefreshToken(refresh_token: string): Promise<RefreshToken> {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    return refreshToken;
  }

  async deleteRefreshToken(userId: string): Promise<any> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
