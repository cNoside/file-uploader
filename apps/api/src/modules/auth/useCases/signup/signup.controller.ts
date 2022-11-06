import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { BaseController } from '../../../../shared/base/controller.base';
import { SignupDTO } from './signup.dto';
import { SignupUseCase } from './signup.usecase';

import { Request, Response } from 'express';
import { SignupError } from './signup.errors';
import { UserMapper } from 'modules/users/mappers/user.mapper';

@Controller('auth/signup')
export class SignupController extends BaseController {
  constructor(
    private readonly useCase: SignupUseCase,
    private readonly userMapper: UserMapper
  ) {
    super();
  }

  @Post()
  async signup(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: SignupDTO
  ) {
    this.bind(req, res);
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case SignupError.EmailAlreadyExists:
            return this.conflict(error.getValue().message);
          case SignupError.UsernameAlreadyExists:
            return this.conflict(error.getValue().message);
        }
      }
      if (result.isRight()) {
        const user = result.value.getValue();
        const dto = this.userMapper.toDTO(user);
        return this.created(dto);
      }
    } catch (err) {
      return this.error(err);
    }
  }
}
