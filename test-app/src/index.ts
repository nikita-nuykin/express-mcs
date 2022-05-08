import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { initAppModule } from '../../src';
import { AppModule } from './app/app.module';
import { environment } from './environment';
import { getValidatedData } from './utils/validate';

const app: Express = express();
app.use(bodyParser.json());

export const appModule = initAppModule({
  Module: AppModule,
  app,
  getValidatedData,
});

export default app.listen(environment.PORT, () => {
  // Pass
});
