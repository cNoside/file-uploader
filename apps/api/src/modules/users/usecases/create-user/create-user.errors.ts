import { Result } from 'shared/result';
import { IDomainError } from 'shared/interfaces/domain-error.interface';
import { ModelValidationError } from '../../../../shared/model-validation.error';
import { IValidationError } from '../../../../shared/validation.error';

export namespace CreateUserError {
  export class UsernameTaken extends Result<IDomainError> {
    constructor(username: string) {
      super(false, {
        message: `Username ${username} is already taken`
      });
    }
  }
  export class EmailTaken extends Result<IDomainError> {
    constructor(email: string) {
      super(false, { message: `Email ${email} is already taken` });
    }
  }
  export class UserValidationError extends ModelValidationError {
    constructor(validationErrors: IValidationError[]) {
      super('user', validationErrors);
    }
  }
}
