import { Result } from './result';
import { IApplicationError } from './interfaces/application-error.interface';

export namespace AppError {
  export class UnexpectedError extends Result<IApplicationError> {
    constructor(err: unknown) {
      super(false, {
        message: '😐 Something went wrong on the server',
        error: err
      });
    }
  }
  export class DatabaseError extends Result<IApplicationError> {
    constructor(err: unknown) {
      super(false, {
        message: '😐 Something went wrong with the database',
        error: err
      });
    }
  }
}
