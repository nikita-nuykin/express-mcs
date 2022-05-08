import { Request, Response } from 'express';
import { Method } from './constants';
import { handleError } from './errors/error-handler';
import { ControllerInstance, MethodName } from './types';
import { getAppFromController, getValidateFuncFromController } from './utils/inject-context';
import { getMethodParams } from './utils/method-params';
import { getControllerRootPath } from './utils/root-path';

function createMethodDecorator(httpMethod: Method) {
  return function decoratorFunc(path = ''): MethodDecorator {
    return (target: unknown, key: MethodName, descriptor: PropertyDescriptor) => {
      const controllerMethod = descriptor.value;

      descriptor.value = async function wrapper() {
        const controller = this as ControllerInstance;
        const url = getControllerRootPath(controller) + path;
        const getValidatedDataFunc = getValidateFuncFromController(controller);
        const method = async (req: Request, res: Response) => {
          const args = await getMethodParams(controller, key, req, res, getValidatedDataFunc);
          if (res.headersSent) return;

          try {
            const result = await controllerMethod.call(this, ...args);
            if (!res.headersSent) {
              res.json(result);
            }
          } catch (error: unknown) {
            handleError(res, error);
          }
        };
        getAppFromController(controller)[httpMethod](url, method);
      };

      descriptor.enumerable = true;
    };
  };
}

export const Post = createMethodDecorator(Method.Post);
export const Patch = createMethodDecorator(Method.Patch);
export const Put = createMethodDecorator(Method.Put);
export const Get = createMethodDecorator(Method.Get);
export const Delete = createMethodDecorator(Method.Delete);
