import { Inject } from '../../../src';
import { BooksAdminService } from '../books/books-admin.service';
import { BooksService } from '../books/books.service';

export class UsersService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject(BooksService) private readonly bookService: BooksService,
    // eslint-disable-next-line no-unused-vars
    @Inject(BooksAdminService) private readonly booksAdminService: BooksAdminService,
  ) {}

  public findAllUsers() {
    return [];
  }
}
