import { IRepository } from 'shared/base/repository.base';
import { User } from '../models';
import { User as UserModel } from '../models';
import { PrismaService } from 'modules/prisma';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

export interface IUserRepository extends IRepository<User> {
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User>;
  findOneByUsername: (username: string) => Promise<User>;
  findOneByEmail: (email: string) => Promise<User>;
  deleteOneById(id: number): Promise<boolean>;
  create(user: User): Promise<UserModel>;
}

export interface IUserRepo extends IUserRepository {}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userMapper: UserMapper
  ) {}

  public async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(this.userMapper.toModel);
  }

  public async findOneById(id: number): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    return user ? this.userMapper.toModel(user) : null;
  }

  public async findOneByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    });
    return user ? this.userMapper.toModel(user) : null;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });
    return user ? this.userMapper.toModel(user) : null;
  }

  public async deleteOneById(id: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      return false;
    }
    await this.prisma.user.delete({
      where: {
        id
      }
    });
    return true;
  }

  public async delete(model: User): Promise<boolean> {
    // return this.deleteById(model.id);
    return true;
  }

  public async save(user: User): Promise<User> {
    const userEntity = this.userMapper.toEntity(user);

    const savedUser = await this.prisma.user.upsert({
      where: {
        id: user.id
      },
      create: userEntity,
      update: userEntity
    });
    return this.userMapper.toModel(savedUser);
  }

  public async create(model: UserModel): Promise<UserModel> {
    const entity = this.userMapper.toEntity(model);
    const createdUser = await this.prisma.user.create({
      data: entity
    });
    return this.userMapper.toModel(createdUser);
  }
}
