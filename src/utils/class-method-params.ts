import { CONTROLLER_METHOD_PARAMS_PROPERTY_NAME, ParamType } from '../constants';
import {
  MethodParams, ControllerClass, MethodName, ControllerInstance,
} from '../types';

function getControllerMethodParams(Cls: ControllerClass): MethodParams {
  const propertyName = CONTROLLER_METHOD_PARAMS_PROPERTY_NAME;
  if (!Cls.prototype[propertyName]) {
    // eslint-disable-next-line
    Cls.prototype[propertyName] = {};
  }
  return Cls.prototype[propertyName] as MethodParams;
}

export function addParamToMethodParams(Cls: ControllerClass, name: MethodName, type: ParamType) {
  const classMethodParams = getControllerMethodParams(Cls);
  if (!classMethodParams[name]) classMethodParams[name] = [];
  classMethodParams[name].push(type);
}

export type GetMethodParamTypeProps = {
  controller: ControllerInstance;
  methodName: MethodName;
};

export function getMethodParamTypes({
  controller,
  methodName,
}: GetMethodParamTypeProps): ParamType[] | undefined {
  const classMethodParams = controller[CONTROLLER_METHOD_PARAMS_PROPERTY_NAME];
  if (!classMethodParams || !classMethodParams[methodName]) return undefined;
  return classMethodParams[methodName];
}
