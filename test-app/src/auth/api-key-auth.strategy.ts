import { getMiddleware } from '../../../src';
import { environment } from '../environment';

export const ApiKeyAuth = getMiddleware(async (req, res) => {
  if (req.headers['apikey'] !== environment.API_KEY_SECRET) {
    res.status(401).send();
  }
});
