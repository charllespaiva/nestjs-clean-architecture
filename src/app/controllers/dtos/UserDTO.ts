import { IsNotEmpty, Length, IsString, IsEmail } from 'class-validator';

export class SignInUserBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserBody {
  @IsNotEmpty()
  @Length(3, 240)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class FindUserBody {
  @IsNotEmpty()
  id: string;
}
