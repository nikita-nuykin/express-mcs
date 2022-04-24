export enum ParamType {
  Req = 'request',
  Res = 'response',
  Body = 'body',
  Params = 'params',
}

export enum Method {
  Post = 'post',
  Patch = 'patch',
  Delete = 'delete',
  Get = 'get',
  Put = 'put',
}

export const CLASS_INJECT_PARAM = '_expressCsmClassInjectParam';
export const CONTROLLER_METHOD_PARAMS_PROPERTY_NAME = '_expressCsmControllerMethodParam'; // TODO rename to controller
export const CONTROLLER_ROOT_PATH_PROPERTY_NAME = '_expressCsmControllerRootPath';
export const CONTROLLER_APP_PROPERTY_NAME = '_expressCsmControllerApp';
