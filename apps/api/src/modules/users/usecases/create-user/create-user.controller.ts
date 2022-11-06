import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { BaseController } from 'shared/base/controller.base';
import { CreateUserUseCase } from './create-user.usecase';
import { Request, Response } from 'express';
import { CreateUserDTO } from './create-user.dto';
import { CreateUserError } from './create-user.errors';
import { IUserDTO } from 'modules/users/dto/user.dto';
import { AppError } from 'shared/app.error';

@Controller('users')
export class CreateUserController extends BaseController {
  constructor(private readonly useCase: CreateUserUseCase) {
    super();
  }

  @Post()
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: CreateUserDTO
  ) {
    try {
      this.bind(req, res);
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateUserError.UserValidationError:
            return this.validationError(
              (error as CreateUserError.UserValidationError).getValue().issues
            );
          case CreateUserError.UsernameTaken:
            return this.conflict(error.getValue().message);
          case CreateUserError.EmailTaken:
            return this.conflict(error.getValue().message);
          default:
            return this.error(error);
        }
      } else {
        const user = result.value.getValue();
        return this.ok(user.toDTO());
      }
    } catch (err) {
      return this.error(err);
    }
  }
}
