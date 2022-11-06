import { Result } from '../../../../shared/result';
import { IDomainError } from 'shared/interfaces/domain-error.interface';

export namespace GetCurrentUserByIdErrors {
  export class UserDoesNotExist extends Result<IDomainError> {
    constructor(id: number) {
      super(false, { message: `User with id ${id} does not exist` });
    }
  }
}
