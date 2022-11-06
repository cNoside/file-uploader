import { ValidationError } from '../../../../shared/validation.error';

export class EmailValidationError extends ValidationError {
  constructor(errors: string[]) {
    super('email', errors);
  }
}
