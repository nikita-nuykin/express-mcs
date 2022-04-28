import { addParamToMethodParams } from './utils/class-method-params';
import { ParamType } from './constants';
import { ControllerClass, MethodName } from './types';

function getParameterDecorator(paramType: ParamType): ParameterDecorator {
  return (target: unknown, name: MethodName) => {
    addParamToMethodParams(target as ControllerClass, name, paramType);
  };
}

export const Req = getParameterDecorator(ParamType.Req);
export const Res = getParameterDecorator(ParamType.Res);
export const Body = getParameterDecorator(ParamType.Body);
export const Params = getParameterDecorator(ParamType.Params);
