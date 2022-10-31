import { ValueObject } from 'shared/base';
import { idSchema } from './id.schema';

type Props = {
  value: number;
};

export class Id extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  static create(props: Props): Id {
    const { value } = props;

    const result = idSchema.safeParse(value);

    switch (result.success) {
      case true:
        return new Id({ value });
      case false:
        throw result.error;
    }
  }
}
