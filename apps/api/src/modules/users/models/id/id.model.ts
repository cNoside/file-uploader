import { Result, Either, right, left } from 'shared/result';
import { ValueObject } from 'shared/base';
import { IDValidationError } from './id.error';
import { idSchema } from './id.schema';

type Props = { value: number };

export class ID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(id: number): Either<IDValidationError, Result<ID>> {
    const validationResult = idSchema.safeParse(id);
    if (validationResult.success === false) {
      const errors = validationResult.error.issues.map((i) => i.message);
      return left(new IDValidationError(errors));
    }
    return right(Result.ok(new ID({ value: validationResult.data })));
  }
}
