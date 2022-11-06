import { ValidationError } from 'shared/validation.error';

export class IDValidationError extends ValidationError {
  constructor(errors: string[]) {
    super('id', errors);
  }
}
