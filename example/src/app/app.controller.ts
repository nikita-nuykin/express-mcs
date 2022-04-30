import { Request, Response } from 'express';

import { Body, Controller, Get, Headers, Params, Post, Query, Req, Res } from '../../../src';
import { APP_ROUTES } from '../constants';

@Controller()
export class AppStatusController {
  @Get(APP_ROUTES.status)
  public status() {
    return { status: 'ok' };
  }

  @Post(APP_ROUTES.testRequest)
  public testRequest(
    @Req req: Request,
    @Body body: Record<string, unknown>,
    @Res res: Response,
    @Params params: unknown,
    @Query query: unknown,
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
}
