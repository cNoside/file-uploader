import { Injectable } from '@nestjs/common';
import { File as FileEntity } from '@prisma/client';

import { Id, Filename, Url, Size } from '../value-objects';
import { User } from 'modules/users';
import { UsersService } from '../../users/users.service';

interface IFileProps {
  id: Id;
  key: string;
  filename: Filename;
  contentLength: Size;
  contentType: string;
  ownerId: number;
}

export class FileModel {
  private constructor(private readonly props: IFileProps) {}

  get id(): Id {
    return this.props.id;
  }

  get key(): string {
    return this.props.key;
  }

  get filename(): Filename {
    return this.props.filename;
  }

  get contentLength(): Size {
    return this.props.contentLength;
  }

  get contentType(): string {
    return this.props.contentType;
  }

  get ownerId(): number {
    return this.props.ownerId;
  }

  static create(props: FileEntity): FileModel {
    const { id, filename, contentType, contentLength, ownerId, key } = props;

    return new FileModel({
      id: Id.create({ value: id }),
      filename: Filename.create({ value: filename }),
      contentType: contentType,
      contentLength: Size.create({ value: contentLength }),
      ownerId: ownerId,
      key: key
    });
  }
}

export const File = FileModel;
