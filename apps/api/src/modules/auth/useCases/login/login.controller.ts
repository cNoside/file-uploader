import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { BaseController } from 'shared/base/controller.base';
import { LoginDTO } from './login.dto';
import { LoginError } from './login.errors';
import { LoginUseCase } from './login.usecase';
import { Request, Response } from 'express';

@Controller('auth/login')
export class LoginController extends BaseController {
  constructor(private readonly useCase: LoginUseCase) {
    super();
  }

  @Post()
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: LoginDTO
  ) {
    this.bind(req, res);
    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        const message = error.getValue().message;

        switch (error.constructor) {
          case LoginError.UserNotFound:
            return this.notFound(message);
          case LoginError.PasswordInvalid:
            return this.unauthorised(message);
          default:
            return this.error(message);
        }
      } else {
        const jwt = result.value.getValue();
        return this.ok({ jwt });
      }
    } catch (err) {
      return this.error(err);
    }
  }
}
