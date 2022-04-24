import { Express } from 'express';
import { CONTROLLER_APP_PROPERTY_NAME } from '../constants';
import { ControllerClass, ControllerInstance } from '../types';

export function setControllerApp(Cls: ControllerClass, app: Express) {
  // eslint-disable-next-line
  Cls.prototype[CONTROLLER_APP_PROPERTY_NAME] = app;
}

export function getControllerApp(controller: ControllerInstance): Express {
  return controller[CONTROLLER_APP_PROPERTY_NAME] as Express;
}
