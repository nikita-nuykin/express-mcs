import { CLASS_INJECT_PARAM } from '../constants';
import { ControllerClass, ServiceClass } from '../types';

function getInjected(Cls: ControllerClass | ServiceClass): Record<number, string> {
  if (!Cls.prototype[CLASS_INJECT_PARAM]) {
    Cls.prototype[CLASS_INJECT_PARAM] = {};
  }
  return Cls.prototype[CLASS_INJECT_PARAM];
}

export function getInjectedList(Cls: ControllerClass | ServiceClass): string[] {
  const params = getInjected(Cls);
  return Object.entries(params)
    .sort(([index1], [index2]) => (Number(index1) > Number(index2) ? 1 : -1))
    .map((item) => item[1]);
}

export function setInjected(Cls: ControllerClass | ServiceClass, name: string, index: number) {
  getInjected(Cls)[index] = name;
}
