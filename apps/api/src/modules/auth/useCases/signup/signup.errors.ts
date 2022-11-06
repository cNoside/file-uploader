import { IDomainError } from 'shared/interfaces/domain-error.interface';
import { Result } from 'shared/result';

export namespace SignupError {
  export class EmailAlreadyExists extends Result<IDomainError> {
    constructor(email: string) {
      super(false, {
        message: `Email ${email} already exists`
      });
    }
  }

  export class UsernameAlreadyExists extends Result<IDomainError> {
    constructor(username: string) {
      super(false, {
        message: `Username ${username} already exists`
      });
    }
  }
}
