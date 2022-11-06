import { ValidationError } from 'shared/validation.error';

export class RoleValidationError extends ValidationError {
  constructor(errors: string[]) {
    super('role', errors);
  }
}
