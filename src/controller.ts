import { ControllerClass } from './types';
import { setControllerRootPath } from './utils/root-path';

export function Controller(path: string) {
  return (constructor: unknown) => {
    setControllerRootPath(constructor as ControllerClass, path);
  };
}
