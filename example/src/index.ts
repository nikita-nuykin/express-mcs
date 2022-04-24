import express, {Express} from 'express';
import bodyParser from 'body-parser';
import { initAppModule } from '../../src';
import { AppModule } from './app/app.module';
import { environment } from './environment';

const app: Express = express();
app.use(bodyParser.json());

initAppModule(AppModule, app);

const server = app.listen(environment.PORT, () => {
  console.log('Started');
});

export default server;
