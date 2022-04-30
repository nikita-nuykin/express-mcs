import { v4 as uuid } from 'uuid';

import { APP_ROUTES } from '../src/constants';
import { environment } from '../src/environment';
import { UserCreateRequestData } from '../src/users/dto/create.dto';
import { UserDeleteRequestParams } from '../src/users/dto/delete.dto';
import { UserType } from '../src/users/user.constants';
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

  describe('Custom middlewares', () => {
    test('Order creates no difference', async () => {
      const request = getRequest();
      const headers = { apikey: environment.API_KEY_SECRET };
      const res1 = await request.get(APP_ROUTES.statusApiKey1).set(headers);
      const res2 = await request.get(APP_ROUTES.statusApiKey2).set(headers);
      expect(res1.statusCode).toBe(200);
      expect(res2.statusCode).toBe(200);
      expect(res1.body).toMatchObject({ status: 'ok' });
      expect(res1.body).toMatchObject(res2.body);
      expect(res2.body).toMatchObject(res1.body);
    });

    test('Middleware can prevent method execution', async () => {
      const request = getRequest();
      const headers = { apikey: uuid() };
      const res = await request.get(APP_ROUTES.statusApiKey1).set(headers);
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({});
    });
  });

  describe('Data validation', () => {
    describe('Request data validation', () => {
      test('Valid data scheme', async () => {
        const request = getRequest();
        const data: UserCreateRequestData = {
          name: uuid(),
          type: UserType.Author,
        };
        const res = await request.post(APP_ROUTES.users.root + APP_ROUTES.users.create).send(data);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
      });

      test('Invalid data scheme', async () => {
        const request = getRequest();
        const data = {
          type: uuid(),
        };
        const res = await request.post(APP_ROUTES.users.root + APP_ROUTES.users.create).send(data);
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
      });
    });

    describe('Request params validation', () => {
      test('Valid data scheme', async () => {
        const request = getRequest();
        const params = { id: uuid() };
        const url = setUrlParams(APP_ROUTES.users.root + APP_ROUTES.users.delete, params);
        const res = await request.delete(url);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
        expect(res.body.id).toBe(params.id);
      });

      test('Invalid data scheme', async () => {
        const request = getRequest();
        const params = { id: 100 };
        const url = setUrlParams(APP_ROUTES.users.root + APP_ROUTES.users.delete, params);
        const res = await request.delete(url);
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
      });
    });
  });
});
