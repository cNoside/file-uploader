import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dto/create-user.dto';

export interface IUserCommandService {
  create(dto: CreateUserDTO): Promise<User>;
  deleteOneById(id: number): Promise<boolean>;
  // changePassword(id: number, password: string): Promise<User>;
  // changeEmail(id: number, email: string): Promise<User>;
  // rename(id: number, username: string): Promise<User>;
}

@Injectable()
export class UserCommandService implements IUserCommandService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository // private readonly passwordService: IPasswordService
  ) {}

  public async create(dto: CreateUserDTO): Promise<User> {
    // const user = User.create({
    //   email: dto.email,
    //   password: dto.password,
    //   role: dto.role,
    //   username: dto.username
    // });
    // const createdUser = await this.userRepository.create(user);
    // if (!createdUser) {
    //   throw new Error('Failed to create user');
    // }
    // return createdUser;
    return {} as User;
  }

  public async deleteOneById(id: number): Promise<boolean> {
    return this.userRepository.deleteOneById(id);
  }

  // public async changePassword(id: number, password: string): Promise<User> {
  //   const hashedPassword = await this.passwordService.hash(password);
  //   const user = await this.userRepository.changePassword(id, hashedPassword);
  //   return user;
  // }
}
