import { Body, Controller, Get, Inject, Post } from '../../../src';
import { APP_ROUTES } from '../constants';
import { UserCreateRequestData } from './dto/create.dto';
import { UsersService } from './users.service';

@Controller(APP_ROUTES.users.root)
export class UsersController {
  constructor(
    @Inject(UsersService)
    private readonly service: UsersService,
  ) {}

  @Get(APP_ROUTES.users.findAll)
  public findAll() {
    return this.service.findAllUsers();
  }

  @Post(APP_ROUTES.users.create)
  public create(@Body(UserCreateRequestData) data: UserCreateRequestData) {
    this.service.create(data);
    return { status: 'ok' };
  }
}
