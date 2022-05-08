import { Body, Controller, Get, Inject, Post, Req } from 'express-mcs';

import { APP_ROUTES } from '../constants';

import { SignUpRequestData, SignUpResponse } from './dto/sign-up.dto';
import { SignInRequestData, SignInResponse } from './dto/sign-in.dto';
import { MeResponse } from './dto/me.dto';
import { AuthService } from './auth.service';
import { RequestWithUser } from './auth.types';
import { UserBasicAuth } from './strategies/auth-user.strategy';

@Controller(APP_ROUTES.auth.root)
export class AuthController {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  @Post(APP_ROUTES.auth.signUp)
  public async signUp(@Body(SignUpRequestData) data: SignUpRequestData): Promise<SignUpResponse> {
    const payload = await this.service.register(data);
    return { status: 'ok', payload };
  }

  @Post(APP_ROUTES.auth.signIn)
  public async signIn(@Body(SignInRequestData) data: SignInRequestData): Promise<SignInResponse> {
    const payload = await this.service.login(data);
    return { status: 'ok', payload };
  }

  @Get(APP_ROUTES.auth.me)
  @UserBasicAuth
  public async me(@Req { user }: RequestWithUser): Promise<MeResponse> {
    const payload = this.service.mapUserToContract(user);
    return { status: 'ok', payload };
  }
}
