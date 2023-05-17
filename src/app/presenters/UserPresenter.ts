import { UserType as User } from '@core/modules/user/entities/user';

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
