import { Controller, Get, Inject } from "../../../src";
import { APP_ROUTES } from "../constants";
import { UsersService } from "./users.service";

@Controller(APP_ROUTES.users.root)
export class UsersController {
  constructor (
    @Inject(UsersService)
    private readonly service: UsersService,
  ) {}

  @Get(APP_ROUTES.users.findAll)
  public findAll() {
    return this.service.findAllUsers;
  }
}