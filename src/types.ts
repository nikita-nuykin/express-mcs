import { Express } from 'express';
import {
  CLASS_INJECT_PARAM,
  CONTROLLER_METHOD_PARAMS_PROPERTY_NAME,
  CONTROLLER_ROOT_PATH_PROPERTY_NAME,
  ParamType,
} from './constants';

export type MethodName = string | symbol;

export type MethodParams = Record<MethodName, ParamType[]>;

export type ModuleParams = {
  include?: ModuleClass[];
  controllers?: unknown[];
  providers?: unknown[];
  export?: unknown[];
};

export type ModuleInstance = {
  params?: ModuleParams;
};

export type ModuleClass = {
  new (): ModuleInstance;
  prototype: ModuleInstance;
  name: string;
};

export type ControllerClass = {
  new (...args: unknown[]): ControllerInstance;
  constructor: ControllerClass;
  prototype: ControllerInstance;
};

export type ControllerInstance = {
  [CONTROLLER_ROOT_PATH_PROPERTY_NAME]?: string;
  [CONTROLLER_METHOD_PARAMS_PROPERTY_NAME]?: MethodParams;
  [CLASS_INJECT_PARAM]?: string[];
  [method: MethodName]: unknown;
};

export type ServiceClass = {
  new (...args: unknown[]): ServiceInstance;
  constructor: ServiceClass
  prototype: ServiceInstance;
};

export type ServiceInstance = {
  [CLASS_INJECT_PARAM]?: string[];
};

export type ControllerMethod = () => unknown;
