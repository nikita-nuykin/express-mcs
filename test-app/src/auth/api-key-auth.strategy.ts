import { AuthorizationError, getMiddleware } from '../../../src';
import { environment } from '../environment';

export const ApiKeyAuth = getMiddleware(async (req) => {
  if (req.headers['apikey'] !== environment.API_KEY_SECRET) {
    throw new AuthorizationError();
  }
});
