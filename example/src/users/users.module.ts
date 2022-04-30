import { Module } from '../../../src';
import { BookModule } from '../books/books.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  include: [BookModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
