import { CLASS_INJECT_PARAM } from '../constants';
import { ControllerClass, ServiceClass } from '../types';

function initInjected(Cls: ControllerClass | ServiceClass) {
  if (Cls.prototype[CLASS_INJECT_PARAM]) return;

  // eslint-disable-next-line
  Cls.prototype[CLASS_INJECT_PARAM] = [];
}

export function setInjected(Cls: ControllerClass | ServiceClass, name: string) {
  initInjected(Cls);
  Cls.prototype[CLASS_INJECT_PARAM]?.push(name);
}

export function getInjected(Cls: ControllerClass | ServiceClass) {
  return Cls.prototype[CLASS_INJECT_PARAM] || [];
}
