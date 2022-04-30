import { Module } from '../../../src';
import { UsersModule } from '../users/users.module';
import { AppStatusController } from './app.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppStatusController],
})
export class AppModule {}
