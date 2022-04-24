import { APP_ROUTES } from '../src/constants';
import { getRequest, stopServer } from './utils';

afterAll(async () => {
  stopServer();
});

describe('Controller Methods', () => {
  test('Handler is created', async () => {
    const request = getRequest();
    const response = await request.get(APP_ROUTES.status);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({status: 'ok'});
  });
});
