import { addParamToMethodParams } from './utils/class-method-params';
import { ParamType } from './constants';
import { ControllerInstance, ExpectedDataClass, MethodName } from './types';

function getParameterDecorator(
  paramType: ParamType,
  expectedDataClass?: ExpectedDataClass,
): ParameterDecorator {
  return (target: unknown, methodName: MethodName, index: number) => {
    addParamToMethodParams({
      Cls: target as ControllerInstance,
      methodName,
      paramType,
      index,
      expectedDataClass,
    });
  };
}

export const Req = getParameterDecorator(ParamType.Req);
export const Res = getParameterDecorator(ParamType.Res);
export const Headers = getParameterDecorator(ParamType.Headers);

export const Body = (dto?: ExpectedDataClass) => getParameterDecorator(ParamType.Body, dto);
export const Params = (dto?: ExpectedDataClass) => getParameterDecorator(ParamType.Params, dto);
export const Query = (dto?: ExpectedDataClass) => getParameterDecorator(ParamType.Query, dto);
