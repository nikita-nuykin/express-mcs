import { CLASS_INJECT_PARAM } from '../constants';
import { ControllerClass, ServiceClass } from '../types';

export function getInjected(Cls: ControllerClass | ServiceClass): string[] {
  if (!Cls.prototype[CLASS_INJECT_PARAM]) {
    Cls.prototype[CLASS_INJECT_PARAM] = [];
  }
  return Cls.prototype[CLASS_INJECT_PARAM];
}

export function setInjected(Cls: ControllerClass | ServiceClass, name: string) {
  getInjected(Cls).push(name);
}
