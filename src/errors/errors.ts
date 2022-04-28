import { ErrorName } from "./error-names";

export class AppDidNotFoundError extends Error {
  constructor() {
    super(ErrorName.AppDidNotFoundError);
  }
}
