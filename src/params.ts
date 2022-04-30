import { addParamToMethodParams } from './utils/class-method-params';
import { ParamType } from './constants';
import { ControllerInstance, MethodName } from './types';

function getParameterDecorator(paramType: ParamType): ParameterDecorator {
  return (target: unknown, name: MethodName, index: number) => {
    addParamToMethodParams(target as ControllerInstance, name, paramType, index);
  };
}

export const Req = getParameterDecorator(ParamType.Req);
export const Res = getParameterDecorator(ParamType.Res);
export const Body = getParameterDecorator(ParamType.Body);
export const Params = getParameterDecorator(ParamType.Params);
export const Query = getParameterDecorator(ParamType.Query);
export const Headers = getParameterDecorator(ParamType.Headers);
