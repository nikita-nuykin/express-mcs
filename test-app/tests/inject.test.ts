import { appModule } from '../src';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { stopServer } from './utils';

afterAll(async () => {
  stopServer();
});

describe('Inject decorator', () => {
  test('UserService is injected to UserController', async () => {
    const controller = appModule.get<UsersController>(UsersController);
    expect(controller['service']).toBeTruthy();
    expect(controller['service']['constructor']['name']).toBe(UsersService.name);
  });

  test('BookService is injected to UsersService', () => {
    const usersService = appModule.get<UsersService>(UsersService);
    const bookService = usersService['bookService'];
    expect(bookService).toBeTruthy();
    expect(bookService.getBookTitles().length).toEqual(1);
  });
});
