import { ValueObject } from 'shared/base';
import { nameSchema } from './name.schema';

type Props = {
  value: string;
};

export class Name extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get filename(): string {
    return this.props.value;
  }

  get name(): string {
    return this.props.value.split('.').slice(0, -1).join('.');
  }

  get extension(): string {
    return this.props.value.split('.').pop() || '';
  }

  static create(props: Props): Name {
    const { value } = props;

    const result = nameSchema.safeParse(value);

    switch (result.success) {
      case true:
        return new Name({ value });
      case false:
        throw result.error;
    }
  }
}
