import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateTaskBody {
  @IsNotEmpty()
  @Length(3, 240)
  title: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class FindTaskBody {
  @IsNotEmpty()
  id: string;
}
