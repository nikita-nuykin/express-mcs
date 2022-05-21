import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { initAppModule } from 'express-mcs';
import { AppModule } from './app/app.module';
import { environment } from './environment';
import { database } from './db/database';

async function main() {
  const app: Express = express();
  await database.init();
  app.use(bodyParser.json());
  initAppModule(AppModule, app);
  app.listen(environment.PORT, () => {
    // Pass
  });
}

main();
