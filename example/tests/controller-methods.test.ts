import { v4 as uuid } from 'uuid';

import { APP_ROUTES } from '../src/constants';
import { environment } from '../src/environment';
import { setUrlParams } from '../src/utils/set-url-params';
import { getRequest, stopServer } from './utils';

afterAll(async () => {
  stopServer();
});

describe('Controller Methods', () => {
  test('Handler is created', async () => {
    const request = getRequest();
    const response = await request.get(APP_ROUTES.status);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({ status: 'ok' });
  });

  describe('Params', () => {
    test('Request is injected', async () => {
      const request = getRequest();
      const response = await request.post(APP_ROUTES.testRequest);
      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual('ok');
      expect(response.body.req.headers.host).toEqual(`127.0.0.1:${environment.PORT}`);
    });

    test('Body is injected', async () => {
      const request = getRequest();
      const id = uuid();
      const response = await request.post(APP_ROUTES.testRequest).send({
        id,
      });
      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual('ok');
      expect(response.body.body.id).toEqual(id);
    });

    test('Response is injected', async () => {
      const request = getRequest();
      const id = uuid();
      const response = await request.post(APP_ROUTES.testRequest).send({
        id,
        responseWithStatus: 400,
      });
      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual('ok');
      expect(response.body.body.id).toEqual(id);
    });

    test('Params are injected', async () => {
      const request = getRequest();
      const urlParams = { id: uuid(), type: uuid() };
      const url = setUrlParams(APP_ROUTES.testRequest, urlParams);
      const response = await request.post(url);
      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual('ok');
      expect(response.body.params).toMatchObject(urlParams);
    });

    test('Query params are injected', async () => {
      const request = getRequest();
      const queryParams = { param1: uuid(), param2: uuid(), param3: [uuid(), uuid()] };
      const response = await request.post(APP_ROUTES.testRequest).query(queryParams);
      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual('ok');
      expect(response.body.query).toMatchObject(queryParams);
    });

    test('Query params are injected', async () => {
      const request = getRequest();
      const headers = { auth: uuid(), 'x-auth': uuid() };
      const response = await request.post(APP_ROUTES.testRequest).set(headers);
      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual('ok');
      expect(response.body.headers).toMatchObject(headers);
    });
  });
});
