import { APP_ROUTES } from '../src/constants';
import { ErrorName } from '../src/errors/error-names';
import { getRequest, stopServer } from './utils';

afterAll(async () => {
  stopServer();
});

describe('Error handler', () => {
  test('Handler is created', async () => {
    const request = getRequest();
    const response = await request.get(APP_ROUTES.customError);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe(ErrorName.UserDoesNotExistError);
  });
});
