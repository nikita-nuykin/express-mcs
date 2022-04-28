import { Request, Response } from 'express';
import { ParamType } from '../constants';
import { ControllerInstance, MethodName } from '../types';
import { getMethodParamTypes } from './class-method-params';

function getParamValueByType(type: ParamType, req: Request, res: Response) {
  switch (type) {
    case ParamType.Req:
      return req;
    case ParamType.Res:
      return res;
    case ParamType.Body:
      return req.body;
    case ParamType.Params:
      return req.params;
    default:
      return undefined;
  }
}

export function getMethodParams(
  controller: ControllerInstance,
  methodName: MethodName,
  req: Request,
  res: Response,
) {
  const paramTypes = getMethodParamTypes({ controller, methodName });
  const args: unknown[] = paramTypes?.map((type) => getParamValueByType(type, req, res)) || [];

  args.push(req, res);
  return args;
}
