import { Request, Response } from 'express';
import { ParamType } from '../constants';
import { ControllerInstance, MethodName, ParamMetadata } from '../types';
import { getMethodParamMetadata } from './class-method-params';
import { getValidatedData } from './data-validator';

function getParamValue(meta: ParamMetadata, req: Request, res: Response) {
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
        return getValidatedData({ data: req.body, Cls: meta.dataClass, res });
      }
      return req.params;
    case ParamType.Query:
      if (meta.dataClass) {
        return getValidatedData({ data: req.body, Cls: meta.dataClass, res });
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
  const paramTypes = getMethodParamMetadata({ controller, methodName });
  const args: unknown[] = paramTypes?.map((meta) => getParamValue(meta, req, res)) || [];
  await Promise.all(args);

  args.push(req, res);
  return args;
}
