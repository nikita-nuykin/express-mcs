import { Module } from '../../../src';
import { BooksAdminService } from './books-admin.service';
import { BooksService } from './books.service';

@Module({
  providers: [BooksService, BooksAdminService],
  export: [BooksService],
})
export class BookModule {}
