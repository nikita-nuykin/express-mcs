import { Inject } from '../../../../src';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { JWT } from '../utils/jwt';
import { UserContract } from './auth.types';
import { SignInRequestData } from './dto/sign-in.dto';
import { SignUpRequestData } from './dto/sign-up.dto';

export class AuthService {
  constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

  public register(data: SignUpRequestData): Promise<UserContract> {
    return this.usersService.create(data).then(this.mapUserToContract);
  }

  public login(data: SignInRequestData): Promise<UserContract> {
    return this.usersService.login(data).then(this.mapUserToContract);
  }

  public mapUserToContract(user: User): UserContract {
    return {
      token: JWT.sign(user),
      data: {
        login: user.login,
      },
    };
  }
}
