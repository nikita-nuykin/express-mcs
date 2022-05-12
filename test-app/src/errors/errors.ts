import { CustomError } from './custom-error';
import { ErrorName } from './error-names';

export class EnvironmentVariableError extends CustomError {
  constructor() {
    super(ErrorName.EnvironmentVariableError);
  }
}

export class NotImplementedError extends CustomError {
  constructor() {
    super(ErrorName.NotImplementedError);
  }
}

export class UserDoesNotExistError extends CustomError {
  constructor() {
    super(ErrorName.UserDoesNotExistError);
  }
}
