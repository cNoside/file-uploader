import { Result } from './result';
import { IDomainError } from './interfaces/domain-error.interface';

export interface IValidationError extends IDomainError {
  name: string;
  issues: string[];
}

export class ValidationError extends Result<IValidationError> {
  constructor(name: string, issues: string[]) {
    super(false, {
      message: `${name} validation error`,
      name,
      issues
    });
  }
}
