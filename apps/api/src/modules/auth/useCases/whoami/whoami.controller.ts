import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { BaseController } from 'shared/base/controller.base';
import { GetUserByIdUseCase } from '../../../users/usecases/get-user-by-id/get-user-by-id.usecase';
import { DeserializedUserExpressRequest } from 'modules/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('auth/whoami')
export class WhoamiController extends BaseController {
  constructor() {
    super();
  }

  @Get()
  async whoami(
    @Req() req: DeserializedUserExpressRequest,
    @Res() res: Response
  ) {
    try {
      this.bind(req, res);
      return this.ok(req.user.toDTO());
    } catch (err) {
      return this.error(err);
    }
  }
}
