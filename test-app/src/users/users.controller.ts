import { Body, Controller, Delete, Get, Inject, Params, Post, Query } from '../../../src';
import { APP_ROUTES } from '../constants';
import { UserCreateRequestData } from './dto/create.dto';
import { UserDeleteRequestParams } from './dto/delete.dto';
import { FindUsersRequestQuery } from './dto/find.dto';
import { UsersService } from './users.service';

@Controller(APP_ROUTES.users.root)
export class UsersController {
  constructor(
    @Inject(UsersService)
    private readonly service: UsersService,
  ) {}

  @Get(APP_ROUTES.users.find)
  public find(@Query(FindUsersRequestQuery) query: FindUsersRequestQuery) {
    const payload = this.service.find();
    return { status: 'ok', payload, query };
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
