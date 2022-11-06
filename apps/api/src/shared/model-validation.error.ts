import { IDomainError } from 'shared/interfaces/domain-error.interface';
import { Result } from './result';
import { IValidationError } from './validation.error';

export interface IModelValidationError extends IDomainError {
  name: string;
  issues: IValidationError[];
}

export class ModelValidationError extends Result<IModelValidationError> {
  constructor(modelName: string, validationErros: IValidationError[]) {
    super(false, {
      message: `${modelName} is invalid`,
      name: modelName,
      issues: validationErros
    });
  }
}
