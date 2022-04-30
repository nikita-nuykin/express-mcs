import { Express } from 'express';
import {
  CONTROLLER_APP_PROPERTY_NAME,
  CONTROLLER_METHOD_PARAMS_PROPERTY_NAME,
  CONTROLLER_ROOT_PATH_PROPERTY_NAME,
  ParamType,
} from './constants';

export type MethodName = string | symbol;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExpectedDataClass = Function & {
  new (): any;
};
export type ParamMetadata = {
  type: ParamType;
  dataClass?: ExpectedDataClass;
};
export type MethodParamMetadata = Record<number, ParamMetadata>;
export type ClassMethodParamMetadata = Record<MethodName, MethodParamMetadata>;

export type ModuleParams = {
  imports?: ModuleClass[];
  controllers?: ControllerClass[];
  providers?: ServiceClass[];
  export?: ServiceClass[];
};

export type ModuleInstance = unknown;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ModuleClass = Function & {
  new (): ModuleInstance;
};

export type ControllerInstance = {
  [CONTROLLER_METHOD_PARAMS_PROPERTY_NAME]?: ClassMethodParamMetadata;
  [CONTROLLER_APP_PROPERTY_NAME]?: Express;
  [CONTROLLER_ROOT_PATH_PROPERTY_NAME]?: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ControllerClass = Function & {
  prototype: ControllerInstance;
};

export type ServiceInstance = unknown;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ServiceClass = Function & {
  prototype: ServiceInstance;
};

export type ControllerMethod = () => unknown;
