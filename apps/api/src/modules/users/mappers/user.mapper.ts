import { Injectable } from '@nestjs/common';
import { Mapper } from 'shared/base';

import { User } from '../models';
import { User as IUserEntity } from '@prisma/client';
import { IUserDTO } from '../dto/user.dto';
import { Email } from '../models/email/email.model';
import { Role } from 'modules/users/models/role/role.model';
import { ID } from '../models/id/id.model';

@Injectable()
export class UserMapper extends Mapper<User, IUserEntity, IUserDTO> {
  public static toEntity(user: User): IUserEntity {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.hashedPassword,
      role: user.role.toUpperCase() as any
    };
  }

  public toEntity(model: User): IUserEntity {
    return UserMapper.toEntity(model);
  }

  public static toDTO(model: User): IUserDTO {
    return {
      id: model.id,
      email: model.email,
      username: model.username,
      role: model.role
    };
  }
  public toDTO(model: User): IUserDTO {
    return UserMapper.toDTO(model);
  }

  public static toModel(entity: IUserEntity): User {
    const idResult = ID.create(entity.id);
    if (idResult.isLeft()) {
      throw new Error('Invalid ID');
    }
    const id = idResult.value.getValue();

    const emailResult = Email.create(entity.email);
    if (emailResult.isLeft()) {
      throw new Error('Failed to create email');
    }
    const email = emailResult.value.getValue();

    const roleResult = Role.create(entity.role);
    if (roleResult.isLeft()) {
      throw new Error('Failed to create role');
    }
    const role = roleResult.value.getValue();

    return User.create({
      id,
      email,
      username: entity.username,
      password: entity.password,
      role
    });
  }

  public toModel(entity: IUserEntity): User {
    return UserMapper.toModel(entity);
  }
}
