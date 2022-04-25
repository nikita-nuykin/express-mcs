import { Request, Response } from 'express';
import { Method } from './constants';
import { ControllerInstance, MethodName } from './types';
import { getControllerApp } from './utils/inject-app';
import { getMethodParams } from './utils/method-params';
import { getControllerRootPath } from './utils/root-path';

function createMethodDecorator(httpMethod: Method) {
  return function decoratorFunc(path = ''): MethodDecorator {
    return (target: unknown, key: MethodName, descriptor: PropertyDescriptor) => {
      const controllerMethod = descriptor.value;

      // eslint-disable-next-line
      descriptor.value = function wrapper() {
        const url = getControllerRootPath(this as ControllerInstance) + path;
        const method = async (req: Request, res: Response) => {
          const args = getMethodParams(this as ControllerInstance, key, req, res);
          const result = await controllerMethod.call(this, ...args);
          res.json(result);
        };
        getControllerApp(target as ControllerInstance)[httpMethod](url, method);
      };

      // eslint-disable-next-line
      descriptor.enumerable = true;
    };
  };
}

export const Post = createMethodDecorator(Method.Post);
export const Patch = createMethodDecorator(Method.Patch);
export const Put = createMethodDecorator(Method.Put);
export const Get = createMethodDecorator(Method.Get);
export const Delete = createMethodDecorator(Method.Delete);
