import { IsString, IsEnum } from 'class-validator';
import { UserType } from '../user.constants';

export class UserCreateRequestData {
  @IsString()
  name!: string;

  @IsEnum(UserType)
  type!: UserType;
}
