import { ErrorName } from './error-names';

export class AppDidNotFoundError extends Error {
  constructor() {
    super(ErrorName.AppDidNotFoundError);
  }
}

export class HttpError extends Error {
  constructor(statusCode: number) {
    super(String(statusCode));
  }
}

export class AuthorizationError extends HttpError {
  constructor() {
    super(401);
  }
}
