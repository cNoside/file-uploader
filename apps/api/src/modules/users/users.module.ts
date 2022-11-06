import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import {
  IUserQueryService,
  UserQueryService
} from './services/user-query.service';
import {
  IUserCommandService,
  UserCommandService
} from './services/user-command.service';
import { UserRepository } from './repositories/user.repository';
import { UserMapper } from './mappers/user.mapper';
import { CreateUserController } from './usecases/create-user/create-user.controller';
import {
  USER_COMMAND_SERVICE,
  USER_QUERY_SERVICE,
  USER_REPOSITORY
} from 'modules/users';
import { CreateUserUseCase } from './usecases/create-user/create-user.usecase';
import { GetUserByIdUseCase } from './usecases/get-user-by-id/get-user-by-id.usecase';
import { GetUserByIdController } from './usecases/get-user-by-id/get-user-by-id.controller';

@Module({
  controllers: [UsersController, CreateUserController, GetUserByIdController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    },
    {
      provide: USER_QUERY_SERVICE,
      useClass: UserQueryService
    },
    {
      provide: USER_COMMAND_SERVICE,
      useClass: UserCommandService
    },
    UserMapper,
    CreateUserUseCase,
    GetUserByIdUseCase
  ],
  exports: ['USER_REPOSITORY', UserMapper, GetUserByIdUseCase]
})
export class UsersModule {}
