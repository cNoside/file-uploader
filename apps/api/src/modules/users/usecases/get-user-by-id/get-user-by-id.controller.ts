import { Controller, Get, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from 'shared/app.error';
import { BaseController } from 'shared/base/controller.base';
import { GetCurrentUserByIdErrors } from './get-user-by-id.error';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';
import { IDValidationError } from '../../models/id/id.error';

@Controller('users')
export class GetUserByIdController extends BaseController {
  constructor(private readonly useCase: GetUserByIdUseCase) {
    super();
  }

  @Get(':id')
  async getUserById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string
  ) {
    try {
      this.bind(req, res);
      const result = await this.useCase.execute(+id);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case IDValidationError:
            return this.badRequest(
              (error as IDValidationError).getValue().issues[0]
            );
          case GetCurrentUserByIdErrors.UserDoesNotExist:
            return this.notFound(error.getValue().message);
          default:
            return this.error(error);
        }
      }
      const user = result.value.getValue();
      return this.ok(user.toDTO());
    } catch (err) {
      return this.error(err);
    }
  }
}
