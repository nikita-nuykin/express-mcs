import { Request, Response } from 'express';
import { MethodName } from './types';

export type BaseReqResDecoratorFunc = (
  req: Request,
  res: Response,
  next: () => unknown
) => Promise<unknown>;

export function getMiddleware(func: BaseReqResDecoratorFunc) {
  return (target: unknown, key: MethodName, descriptor: PropertyDescriptor) => {
    const controllerMethod = descriptor.value;

    // eslint-disable-next-line
    descriptor.value = function inner(...args: unknown[]) {
      const req = args[args.length - 2] as Request;
      const res = args[args.length - 1] as Response;
      return func(req, res, () => controllerMethod.call(this, ...args));
    };
    return descriptor;
  };
}
