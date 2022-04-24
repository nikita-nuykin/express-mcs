import {Module} from '../../../src';
import { UsersModule } from '../users/users.module';
import { AppStatusController } from './app.controller';

@Module({
  include: [UsersModule],
  controllers: [AppStatusController],
})
export class AppModule {}
