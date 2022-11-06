import { Request, Response } from 'express';
import { IValidationError } from 'shared/validation.error';

type Status = 'success' | 'error' | 'fail';
type ResponseData = Record<string, any>;
interface ResponseDTO {
  status: 'success' | 'fail' | 'error';
  statusCode: number;
  data: ResponseData;
}

export abstract class BaseController {
  private _req: Request;
  private _res: Response;

  protected bind(req: Request, res: Response): void {
    this._req = req;
    this._res = res;
  }

  private json(code: number, dto?: Record<string, any>) {
    const status: Status =
      code < 400 ? 'success' : code < 500 ? 'fail' : 'error';

    const response: ResponseDTO = {
      status,
      statusCode: code,
      data: dto
    };
    return this._res.status(code).json(response);
  }

  public ok<T extends Record<string, any>>(dto?: T) {
    return this.json(200, dto);
  }

  public error(
    error: unknown,
    message: string = '😐 Something went wrong on the server' // don't expose error details to the client
  ) {
    console.error(error);
    return this.json(500, {
      message
    });
  }

  public notFound(message: string = '🤷‍♂️ Not found') {
    return this.json(404, { message });
  }

  public unauthorised(message: string = '⛔ Unauthorized') {
    return this.json(401, { message });
  }

  public unauthorized(message: string = '⛔ Unauthorized') {
    return this.json(401, { message });
  }

  public conflict(message: string = '🤜 Conflict') {
    return this.json(409, { message });
  }

  public badRequest(message: string = '📛 Bad request') {
    return this.json(400, { message });
  }

  public validationError(validationErrors: IValidationError[]) {
    return this.json(400, { errors: validationErrors });
  }

  public created<T extends Record<string, any>>(dto?: T) {
    return this.json(201, dto);
  }

  public forbidden(message: string = '⛔ Forbidden') {
    return this.json(403, { message });
  }

  public noContent() {
    return this.json(204);
  }
}
