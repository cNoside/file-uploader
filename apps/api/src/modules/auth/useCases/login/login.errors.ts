import { Result } from 'shared/result';
import { IDomainError } from '../../../../shared/interfaces/domain-error.interface';

// possible errors
// 1. user not found
// 2. password is incorrect
// 3. user is not verified
// 4. user is banned
// 5. user is deleted
// 6. user is not active
// 7. user is not logged in
// 8. user is not logged out

export namespace LoginError {
  export class UserNotFound extends Result<IDomainError> {
    constructor(email: string) {
      super(false, {
        message: `User ${email} not found`
      });
    }
  }
  export class PasswordInvalid extends Result<IDomainError> {
    constructor() {
      super(false, {
        message: 'Password is invalid'
      });
    }
  }
}
