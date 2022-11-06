import { ValueObject } from '../../../../shared/base/value-object.base';
import { Result, Either, left, right } from 'shared/result';
import { EmailValidationError } from './email.error';
import { emailSchema } from './email.schema';

type Props = {
  value: string;
};

export class Email extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get username(): string {
    return this.value.split('@')[0];
  }

  get domainName(): string {
    return this.value.split('@')[1];
  }

  public static create(
    email: string
  ): Either<EmailValidationError, Result<Email>> {
    const result = emailSchema.safeParse(email);
    if (result.success === false) {
      const errors = result.error.issues.map((i) => i.message);
      return left(new EmailValidationError(errors));
    }
    return right(Result.ok(new Email({ value: result.data })));
  }
}
