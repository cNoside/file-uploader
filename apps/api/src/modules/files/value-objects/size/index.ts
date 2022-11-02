import { ValueObject } from 'shared/base';
import { sizeSchema } from './size.schema';

type Props = {
  value: number;
};

export class Size extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  get bytes(): number {
    return this.value;
  }

  get kilobytes(): number {
    return this.bytes / 1024;
  }

  get megaBytes(): number {
    return this.kilobytes / 1024;
  }

  get gigabytes(): number {
    return this.kilobytes / 1024;
  }

  get humanReadable(): string {
    const kilobytes = this.kilobytes;
    const megabytes = kilobytes / 1024;
    const gigabytes = megabytes / 1024;

    if (gigabytes >= 1) {
      return `${gigabytes.toFixed(2)} GB`;
    }
    if (megabytes >= 1) {
      return `${megabytes.toFixed(2)} MB`;
    }
    if (kilobytes >= 1) {
      return `${kilobytes.toFixed(2)} KB`;
    }
    return `${this.bytes} B`;
  }

  static create(props: Props): Size {
    const { value } = props;

    const result = sizeSchema.safeParse(value);

    switch (result.success) {
      case true:
        return new Size({ value });
      case false:
        throw result.error;
    }
  }
}
