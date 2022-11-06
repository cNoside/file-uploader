import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/base/controller.base';
import { AppError } from 'shared/app.error';
import { UserSerialisedExpressRequest } from 'modules/users/interfaces/user-serialised-express-request';

@Controller('auth/whoami')
export class GetCurrentUserController extends BaseController {
  constructor(private readonly useCase) {
    super();
  }

  @Get()
  async getCurrentUser(
    @Req() req: UserSerialisedExpressRequest,
    @Res() res: Response
  ) {
    try {
      const user = req.user;
    } catch (err) {
      const error = new AppError.UnexpectedError(err);
      this.error(error);
    }
  }
}
