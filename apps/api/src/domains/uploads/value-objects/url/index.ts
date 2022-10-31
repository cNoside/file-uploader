import { ValueObject } from 'shared/base';
import { urlSchema } from './url.schema';

type Props = {
  value: string;
};

export class Url extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get href(): string {
    return this.value;
  }

  get pathname(): string {
    return new URL(this.value).pathname;
  }

  static create(props: Props): Url {
    const { value } = props;

    const result = urlSchema.safeParse(value);

    switch (result.success) {
      case true:
        return new Url({ value });
      case false:
        throw result.error;
    }
  }
}
