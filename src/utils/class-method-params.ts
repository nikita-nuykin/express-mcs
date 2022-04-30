import { CONTROLLER_METHOD_PARAMS_PROPERTY_NAME, ParamType } from '../constants';
import {
  ClassMethodParamMetadata,
  MethodName,
  ControllerInstance,
  ExpectedDataClass,
  ParamMetadata,
} from '../types';

function getControllerMethodParams(Cls: ControllerInstance): ClassMethodParamMetadata {
  const propertyName = CONTROLLER_METHOD_PARAMS_PROPERTY_NAME;
  if (!Cls[propertyName]) {
    Cls[propertyName] = {};
  }
  return Cls[propertyName] as ClassMethodParamMetadata;
}

export type AddParamToMethodParamsProps = {
  Cls: ControllerInstance;
  methodName: MethodName;
  paramType: ParamType;
  index: number;
  expectedDataClass?: ExpectedDataClass;
};

export function addParamToMethodParams({
  Cls,
  methodName,
  index,
  paramType,
  expectedDataClass,
}: AddParamToMethodParamsProps) {
  const params = getControllerMethodParams(Cls);
  if (!params[methodName]) {
    params[methodName] = {};
  }
  params[methodName][index] = { type: paramType, dataClass: expectedDataClass };
}

export type GetMethodParamTypeProps = {
  controller: ControllerInstance;
  methodName: MethodName;
};

export function getMethodParamMetadata({
  controller,
  methodName,
}: GetMethodParamTypeProps): ParamMetadata[] | undefined {
  const classMethodParams = controller[CONTROLLER_METHOD_PARAMS_PROPERTY_NAME];
  if (!classMethodParams || !classMethodParams[methodName]) return undefined;
  const obj = classMethodParams[methodName];
  return Object.entries(obj)
    .sort(([index1], [index2]) => (Number(index1) > Number(index2) ? 1 : -1))
    .map((item) => item[1]);
}
