import { Controller, Get } from '../../../../src';
import { APP_ROUTES } from '../constants';

@Controller()
export class AppStatusController {
  @Get(APP_ROUTES.status)
  public status() {
    return { status: 'ok' };
  }
}
