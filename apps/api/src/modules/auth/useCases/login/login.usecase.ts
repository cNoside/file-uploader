import { IUserRepo } from 'modules/users/repositories/user.repository';
import { UseCase } from '../../../../shared/base/usecase.base';
import { LoginDTO } from './login.dto';
import { Result, Either, Left, Right, left, right } from 'shared/result';
import { LoginError } from './login.errors';
import { AppError } from 'shared/app.error';
import { Inject } from '@nestjs/common';
import { IPasswordService } from '../../models/password-service.model';
import { AuthService } from 'modules/auth/services/auth.service';

type Response = Either<
  | LoginError.UserNotFound
  | LoginError.PasswordInvalid
  | AppError.UnexpectedError,
  Result<string>
>;

export class LoginUseCase extends UseCase<LoginDTO, Response> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: IUserRepo,
    @Inject('PASSWORD_SERVICE')
    private readonly passwordService: IPasswordService,
    private readonly authService: AuthService
  ) {
    super();
  }

  async execute(dto: LoginDTO): Promise<Response> {
    const { email, password } = dto;
    try {
      const [userByUsername, userByEmail] = await Promise.all([
        this.userRepo.findOneByUsername(email),
        this.userRepo.findOneByEmail(email)
      ]);
      const user = userByUsername || userByEmail;
      if (!user) {
        return left(new LoginError.UserNotFound(email));
      }

      const isValidPassword = await this.passwordService.compare(
        password,
        user.hashedPassword
      );
      if (!isValidPassword) {
        return left(new LoginError.PasswordInvalid());
      }

      const jwt = await this.authService.createJWT(user);
      return right(Result.ok(jwt));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
