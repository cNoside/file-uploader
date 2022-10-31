import { Id, Name, Url, Size } from 'domains/uploads';

interface IUploadProps {
  id: Id;
  name: Name;
  url: Url;
  size: Size;
}

export class Upload {
  private constructor(private readonly props: IUploadProps) {}

  get id(): Id {
    return this.props.id;
  }

  get name(): Name {
    return this.props.name;
  }

  get url(): Url {
    return this.props.url;
  }

  get size(): Size {
    return this.props.size;
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name.value,
      url: this.url.value,
      size: this.size.value
    };
  }

  static create(props: IUploadProps): Upload {
    const { id, name, url, size } = props;

    return new Upload({
      id: Id.create(id),
      name: Name.create(name),
      url: Url.create(url),
      size: Size.create(size)
    });
  }
}
