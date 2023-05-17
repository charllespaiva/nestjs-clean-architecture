import { RefreshToken } from '@prisma/client';
import { UserType } from '../entities/user';

export abstract class UserGateway {
  abstract create(user: UserType): Promise<UserType | null>;
  abstract findById(userId: string): Promise<UserType | null>;
  abstract update(user: UserType): Promise<UserType>;
  abstract delete(userId: string): Promise<void>;
  abstract findEmail(email: string): Promise<UserType | null>;
  abstract refreshToken(userId: string): Promise<any>;
  abstract verifyRefreshToken(
    refreshToken: string,
  ): Promise<RefreshToken | null>;
  abstract deleteRefreshToken(userId: string): Promise<any>;
}
