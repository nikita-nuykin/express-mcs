import {Module} from '../../../src';
import { AppStatusController } from './app.controller';

@Module({
  controllers: [AppStatusController]
})
export class AppModule {}
