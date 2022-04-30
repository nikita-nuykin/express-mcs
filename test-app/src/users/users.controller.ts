import { Body, Controller, Delete, Get, Inject, Params, Post } from '../../../src';
import { APP_ROUTES } from '../constants';
import { UserCreateRequestData } from './dto/create.dto';
import { UserDeleteRequestParams } from './dto/delete.dto';
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
  public create(@Body(UserCreateRequestData) { name }: UserCreateRequestData) {
    return { status: 'ok', name };
  }

  @Delete(APP_ROUTES.users.delete)
  public update(@Params(UserDeleteRequestParams) { id }: UserDeleteRequestParams) {
    return { status: 'ok', id };
  }
}
