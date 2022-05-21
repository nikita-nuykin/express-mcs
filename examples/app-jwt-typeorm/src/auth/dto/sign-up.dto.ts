import { IsString, Min } from 'class-validator';
import { UserContract } from '../auth.types';

export class SignUpRequestData {
  @IsString()
  login!: string;

  @IsString()
  // @Min(8)
  password!: string;
}

export class SignUpResponse {
  status!: 'ok';

  payload!: UserContract;
}
