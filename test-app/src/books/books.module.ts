import { Module } from '../../../src';
import { BooksAdminService } from './books-admin.service';
import { BooksService } from './books.service';

@Module({
  providers: [BooksService, BooksAdminService],
  exports: [BooksService],
})
export class BookModule {}
