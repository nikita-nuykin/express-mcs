export enum ParamType {
  Req = 'request',
  Res = 'response',
  Body = 'body',
  Params = 'params',
  Query = 'query',
  Headers = 'headers',
}

export enum Method {
  Post = 'post',
  Patch = 'patch',
  Delete = 'delete',
  Get = 'get',
  Put = 'put',
}

export const CLASS_INJECT_PARAM = '_expressMcsClassInjectParam';
export const CONTROLLER_METHOD_PARAMS_PROPERTY_NAME = '_expressMcsControllerMethodParam';
export const CONTROLLER_ROOT_PATH_PROPERTY_NAME = '_expressMcsControllerRootPath';
export const CONTROLLER_APP_CONTEXT_PROPERTY_NAME = '_expressMcsControllerAppContext';
