import { CONTROLLER_METHOD_PARAMS_PROPERTY_NAME, ParamType } from '../constants';
import { MethodParams, MethodName, ControllerInstance } from '../types';

function getControllerMethodParams(Cls: ControllerInstance): MethodParams {
  const propertyName = CONTROLLER_METHOD_PARAMS_PROPERTY_NAME;
  if (!Cls[propertyName]) {
    Cls[propertyName] = {};
  }
  return Cls[propertyName] as MethodParams;
}

export function addParamToMethodParams(
  Cls: ControllerInstance,
  methodName: MethodName,
  type: ParamType,
  index: number,
) {
  const params = getControllerMethodParams(Cls);
  if (!params[methodName]) {
    params[methodName] = {};
    params[methodName][index] = type;
  } else {
    params[methodName][index] = type;
  }
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
  const obj = classMethodParams[methodName];
  return Object.entries(obj)
    .sort(([index1], [index2]) => (Number(index1) > Number(index2) ? 1 : -1))
    .map((item) => item[1]);
}
