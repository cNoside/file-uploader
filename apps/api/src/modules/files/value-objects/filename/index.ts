import { ValueObject } from 'shared/base';
import { filenameSchema } from './filename.schema';

type Props = {
  value: string;
};

export class Filename extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get name(): string {
    return this.props.value.split('.').slice(0, -1).join('.');
  }

  get extension(): string {
    return this.props.value.split('.').pop() || '';
  }

  static create(props: Props): Filename {
    const { value } = props;

    const result = filenameSchema.safeParse(value);

    switch (result.success) {
      case true:
        return new Filename({ value });
      case false:
        throw result.error;
    }
  }
}
