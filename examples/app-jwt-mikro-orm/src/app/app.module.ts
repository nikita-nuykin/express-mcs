import { Module } from '../../../../src';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AppStatusController } from './app.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppStatusController],
})
export class AppModule {}
