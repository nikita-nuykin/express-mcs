import { Request, Response } from 'express';
import { ParamType } from '../constants';
import { ControllerInstance, MethodName, ParamMetadata } from '../types';
import { getMethodParamMetadata } from './class-method-params';
import { getValidatedData } from './data-validator';

async function getParamValue(meta: ParamMetadata, req: Request, res: Response): Promise<unknown> {
  switch (meta.type) {
    case ParamType.Req:
      return req;
    case ParamType.Res:
      return res;
    case ParamType.Body:
      if (meta.dataClass) {
        return getValidatedData({ data: req.body, Cls: meta.dataClass, res });
      }
      return req.body;
    case ParamType.Params:
      if (meta.dataClass) {
        return getValidatedData({ data: req.params, Cls: meta.dataClass, res });
      }
      return req.params;
    case ParamType.Query:
      if (meta.dataClass) {
        return getValidatedData({ data: req.query, Cls: meta.dataClass, res });
      }
      return req.query;
    case ParamType.Headers:
      return req.headers;
    default:
      return undefined;
  }
}

export async function getMethodParams(
  controller: ControllerInstance,
  methodName: MethodName,
  req: Request,
  res: Response,
) {
  const paramMeta = getMethodParamMetadata({ controller, methodName }) || [];
  const args: unknown[] = [];
  for (const meta of paramMeta) {
    if (res.headersSent) continue;

    const value = await getParamValue(meta, req, res);
    args.push(value);
  }

  args.push(req, res);
  return args;
}
