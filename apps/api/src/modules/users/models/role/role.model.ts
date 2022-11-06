import { ValueObject } from '../../../../shared/base/value-object.base';
import { Result, right, left, Either } from 'shared/result';
import { roleSchema } from './role.schema';
import { RoleValidationError } from './role.error';

type Props = { value: string };

type CreateRoleResult = Either<RoleValidationError, Result<Role>>;

export class Role extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  // get permissions() {
  //   return {
  //     CREATE_USER: this.value === 'admin'
  //   };
  // }

  public static create(role: string): CreateRoleResult {
    const result = roleSchema.safeParse(role);
    if (result.success === false) {
      const errors = result.error.issues.map((i) => i.message);
      return left(new RoleValidationError(errors));
    }
    return right(Result.ok(new Role({ value: result.data })));
  }
}
