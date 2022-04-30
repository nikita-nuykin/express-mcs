import { Inject } from '../../../src';
import { BooksAdminService } from '../books/books-admin.service';
import { BooksService } from '../books/books.service';
import { UserCreateRequestData } from './dto/create.dto';

export class UsersService {
  constructor(
    @Inject(BooksService) private readonly bookService: BooksService,
    @Inject(BooksAdminService) private readonly booksAdminService: BooksAdminService,
  ) {}

  public findAllUsers() {
    return [];
  }

  public create(data: UserCreateRequestData) {
    return data;
  }
}
