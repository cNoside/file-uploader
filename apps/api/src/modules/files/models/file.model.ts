import { Injectable } from '@nestjs/common';
import { File as FileEntity } from '@prisma/client';

import { Id, Filename, Url, Size } from '../value-objects';
import { User } from 'modules/users';
import { UsersService } from '../../users/users.service';

interface IFileProps {
  key: string;
  filename: string;
  contentLength: number;
  contentType: string;
  ownerId: number;
}
interface IFileModelProps {
  key: string;
  filename: Filename;
  contentLength: Size;
  contentType: string;
  ownerId: number;
}

export class FileModel {
  private constructor(
    private readonly props: IFileModelProps,
    private readonly _id?: Id
  ) {}

  public get id(): Id | null | undefined {
    return this._id;
  }

  public get key(): string {
    return this.props.key;
  }

  public get filename(): Filename {
    return this.props.filename;
  }

  public get contentLength(): Size {
    return this.props.contentLength;
  }

  public get contentType(): string {
    return this.props.contentType;
  }

  public get ownerId(): number {
    return this.props.ownerId;
  }

  public rename(filename: string): void {
    this.props.filename = Filename.create({ value: filename });
  }

  public changeOwner(ownerId: number): void {
    this.props.ownerId = ownerId;
  }

  static create(props: IFileProps, id?: number): FileModel {
    const { filename, contentType, contentLength, ownerId, key } = props;

    return new FileModel(
      {
        filename: Filename.create({ value: filename }),
        contentType: contentType,
        contentLength: Size.create({ value: contentLength }),
        ownerId: ownerId,
        key: key
      },
      id ? Id.create({ value: id }) : undefined
    );
  }
}

export const File = FileModel;
