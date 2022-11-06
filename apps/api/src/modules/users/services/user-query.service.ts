import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';

export interface IUserQueryService {
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneByUsername(username: string): Promise<User>;
}

@Injectable()
export class UserQueryService implements IUserQueryService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    private readonly userMap: UserMapper
  ) {}

  public async findAll(): Promise<User[]> {
    const users = await this.userRepo.findAll();
    return users;
  }

  public async findOneById(id: number): Promise<User> {
    const user = await this.userRepo.findOneById(id);
    return user;
  }

  public async findOneByEmail(email: string): Promise<User> {
    return {} as User;
  }

  public async findOneByUsername(username: string): Promise<User> {
    return {} as User;
  }
}
