import { Request, Response } from 'express';

import { Body, Controller, Get, Headers, Params, Post, Query, Req, Res } from '../../../src';
import { ApiKeyAuth } from '../auth/api-key-auth.strategy';
import { APP_ROUTES } from '../constants';
import { UserDoesNotExistError } from '../errors/errors';

@Controller()
export class AppStatusController {
  @Get(APP_ROUTES.status)
  public status() {
    return { status: 'ok' };
  }

  @Post(APP_ROUTES.testRequest)
  public testRequest(
    @Req req: Request,
    @Body() body: Record<string, unknown>,
    @Res res: Response,
    @Params() params: unknown,
    @Query() query: unknown,
    @Headers headers: unknown,
  ) {
    const result = {
      status: 'ok',
      req: {
        headers: req.headers,
        params: req.params,
      },
      params,
      body,
      query,
      headers,
    };

    if (body.responseWithStatus) {
      res.status(body.responseWithStatus as number);
      res.json(result);
    }
    return result;
  }

  @Get(APP_ROUTES.statusApiKey1)
  @ApiKeyAuth
  public statusApiKey1() {
    return { status: 'ok' };
  }

  @ApiKeyAuth
  @Get(APP_ROUTES.statusApiKey2)
  public statusApiKey2() {
    return { status: 'ok' };
  }

  @Get(APP_ROUTES.customError)
  public customError() {
    throw new UserDoesNotExistError();
  }
}
