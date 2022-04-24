import { CustomError } from "./custom-error";
import { ErrorName } from "./error-names";

export class EnvironmentVariableError extends CustomError {
  constructor() {
    super(ErrorName.EnvironmentVariableError);
  }
}
