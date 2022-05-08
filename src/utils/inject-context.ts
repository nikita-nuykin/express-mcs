import { Express } from 'express';
import { AppContext } from '../app-context';
import { CONTROLLER_APP_CONTEXT_PROPERTY_NAME } from '../constants';
import { AppDidNotFoundError } from '../errors/errors';
import { ControllerClass, ControllerInstance, GetValidatedData } from '../types';

export function setContextToController(Cls: ControllerClass, context: AppContext) {
  Cls.prototype[CONTROLLER_APP_CONTEXT_PROPERTY_NAME] = context;
}

export function getAppFromController(controller: ControllerInstance): Express {
  const app = controller[CONTROLLER_APP_CONTEXT_PROPERTY_NAME]?.app;
  if (!app) {
    throw new AppDidNotFoundError();
  }
  return app;
}

export function getValidateFuncFromController(
  controller: ControllerInstance,
): GetValidatedData | undefined {
  return controller[CONTROLLER_APP_CONTEXT_PROPERTY_NAME]?.getValidatedData;
}
