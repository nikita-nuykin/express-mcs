import { IsString } from 'class-validator';
import { UserContract } from '../auth.types';

export class SignInRequestData {
  @IsString()
  login!: string;

  @IsString()
  password!: string;
}

export class SignInResponse {
  status!: 'ok';

  payload!: UserContract;
}
