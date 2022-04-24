import express, {Express} from 'express';
import bodyParser from 'body-parser';
import { initAppModule } from '../../src';
import { AppModule } from './app/app.module';
import { environment } from './environment';

const app: Express = express();
app.use(bodyParser.json());

export const appModule = initAppModule(AppModule, app);

export default app.listen(environment.PORT, () => {
  // Pass
});
