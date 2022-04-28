import { Express } from 'express';
import { CONTROLLER_APP_PROPERTY_NAME } from '../constants';
import { AppDidNotFoundError } from '../errors/errors';
import { ControllerClass, ControllerInstance } from '../types';

export function setControllerApp(Cls: ControllerClass, app: Express) {
  Cls.prototype[CONTROLLER_APP_PROPERTY_NAME] = app;
}

export function getControllerApp(controller: ControllerInstance): Express {
  const app = controller[CONTROLLER_APP_PROPERTY_NAME];
  if (!app) {
    throw new AppDidNotFoundError();
  }
  return app;
}
