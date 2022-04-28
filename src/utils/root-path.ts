import { CONTROLLER_ROOT_PATH_PROPERTY_NAME } from '../constants';
import { ControllerClass, ControllerInstance } from '../types';

export function setControllerRootPath(Cls: ControllerClass, path: string) {
  Cls.prototype[CONTROLLER_ROOT_PATH_PROPERTY_NAME] = path;
}

export function getControllerRootPath(controller: ControllerInstance): string {
  return controller[CONTROLLER_ROOT_PATH_PROPERTY_NAME] || '';
}
