import { Request, Response } from 'express';
import { Method } from './constants';
import { handleError as defaultHandleError } from './errors/error-handler';
import { BaseReqResDecoratorFunc } from './middleware';
import { ControllerInstance, MethodName } from './types';
import {
  getAppFromController,
  getValidateFuncFromController,
  getCustomHandleErrorFunc,
} from './utils/inject-context';
import { getMethodParams } from './utils/method-params';
import { getControllerRootPath } from './utils/root-path';

function createMethodDecorator(httpMethod: Method) {
  return function decoratorFunc(path = ''): MethodDecorator {
    return (target: unknown, key: MethodName, descriptor: PropertyDescriptor) => {
      const controllerMethod = descriptor.value;

      descriptor.value = async function wrapper(before?: BaseReqResDecoratorFunc[]) {
        const controller = this as ControllerInstance;
        const url = getControllerRootPath(controller) + path;
        const getValidatedDataFunc = getValidateFuncFromController(controller);
        const handleError = getCustomHandleErrorFunc(controller) || defaultHandleError;
        const method = async (req: Request, res: Response) => {
          try {
            if (before) {
              for (const func of before) {
                await func(req, res);
              }
            }

            const args = await getMethodParams(controller, key, req, res, getValidatedDataFunc);
            if (res.headersSent) return;

            const result = await controllerMethod.call(this, ...args);
            if (!res.headersSent) {
              res.json(result);
            }
          } catch (error: unknown) {
            await handleError(res, error);
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
