import { Result } from '../../../../shared/result';
import { IDomainError } from 'shared/interfaces/domain-error.interface';
export namespace GetCurrentUserError {
  export class UserDoesNotExist extends Result<IDomainError> {
    constructor(email: string) {
      super(false, { message: `User ${email} does not exist` });
    }
  }
}
