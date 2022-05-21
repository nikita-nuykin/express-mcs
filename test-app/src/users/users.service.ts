import { Inject } from '../../../src';
import { BooksService } from '../books/books.service';
import { UserCreateRequestData } from './dto/create.dto';

export class UsersService {
  constructor(@Inject(BooksService) private readonly bookService: BooksService) {}

  public find() {
    return [];
  }

  public create(data: UserCreateRequestData) {
    return data;
  }
}
