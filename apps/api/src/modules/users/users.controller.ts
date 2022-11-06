import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Inject,
  ParseIntPipe
} from '@nestjs/common';
import { IUserDTO } from './dto/user.dto';
import { UserMapper } from './mappers/user.mapper';
import { IUserQueryService } from './services/user-query.service';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  IUserCommandService,
  UserCommandService
} from './services/user-command.service';
import { RenameUserDTO } from './dto/rename-user.dto';

export interface IResponse<T extends Record<string, any> = any> {
  status: 'success' | 'fail' | 'error';
  data: T;
}

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_COMMAND_SERVICE')
    private readonly userCommandService: IUserCommandService,
    @Inject('USER_QUERY_SERVICE')
    private readonly userQueryService: IUserQueryService,
    private readonly userMapper: UserMapper
  ) {}

  @Get()
  async findAll(): Promise<IResponse<{ users: IUserDTO[] }>> {
    const users = await this.userQueryService.findAll();
    const userDTOs = users.map((user) => this.userMapper.toDTO(user));
    return {
      status: 'success',
      data: { users: userDTOs }
    };
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id', ParseIntPipe) id: number
  // ): Promise<IResponse<{ user: IUserDTO }>> {
  //   const user = await this.userQueryService.findOneById(id);
  //   const userDTO = this.userMapper.toDTO(user);
  //   return {
  //     status: 'success',
  //     data: { user: userDTO }
  //   };
  // }

  // @Post(':id/rename')
  // async rename(
  //   @Param('id') id: number,
  //   @Body() renameUserDto: RenameUserDTO
  // ): Promise<IResponse<{ user: IUserDTO }>> {
  //   const user = await this.userCommandService.rename(
  //     id,
  //     renameUserDto.username
  //   );
  //   const userDTO = this.userMapper.toDTO(user);
  //   return {
  //     status: 'success',
  //     data: { user: userDTO }
  //   };
  // }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
    const isSuccess = await this.userCommandService.deleteOneById(id);
    if (!isSuccess) {
      throw new NotFoundException();
    }
    return {
      status: 'success',
      data: {
        message: 'User deleted successfully'
      }
    };
  }
}
