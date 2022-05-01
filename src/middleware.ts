import { Request, Response } from 'express';

export type BaseReqResDecoratorFunc = (req: Request, res: Response) => Promise<void>;

export function getMiddleware(func: BaseReqResDecoratorFunc) {
  return (target: unknown, key: unknown, descriptor: PropertyDescriptor) => {
    const controllerMethod = descriptor.value;

    descriptor.value = async function inner(...args: unknown[]) {
      const req = args[args.length - 2] as Request;
      const res = args[args.length - 1] as Response;
      if (req && res) {
        await func(req, res);
      }
      if (res && res.headersSent) return;
      return controllerMethod.call(this, ...args);
    };
    return descriptor;
  };
}
