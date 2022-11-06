import { SignupDTO } from './signup.dto';
import { Either, Result, left, right } from '../../../../shared/result';
import { SignupError } from './signup.errors';
import { AppError } from 'shared/app.error';
import { User } from 'modules/users';
import { UseCase } from 'shared/base/usecase.base';
import { Inject } from '@nestjs/common';
import { IUserRepo } from 'modules/users/repositories/user.repository';
import { IPasswordService } from 'modules/auth/models/password-service.model';
import { IValidationError } from 'shared/validation.error';
import { Email } from '../../../users/models/email/email.model';
import { CreateUserError } from 'modules/users/usecases/create-user/create-user.errors';
import { Role } from 'modules/users/models/role/role.model';

type Response = Either<
  | SignupError.EmailAlreadyExists
  | SignupError.UsernameAlreadyExists
  | AppError.UnexpectedError,
  Result<User>
>;

export class SignupUseCase extends UseCase<SignupDTO, Response> {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepo: IUserRepo,
    @Inject('PASSWORD_SERVICE')
    private readonly passwordService: IPasswordService
  ) {
    super();
  }

  public async execute(request: SignupDTO): Promise<Response> {
    const { email, username, password } = request;
    try {
      const validationErrors: IValidationError[] = [];
      const emailResult = Email.create(email);
      if (emailResult.isLeft()) {
        const error = emailResult.value.getValue();
        validationErrors.push(error);
      }

      if (validationErrors.length > 0) {
        return left(new CreateUserError.UserValidationError(validationErrors));
      }

      const [userByEmail, userByUsername] = await Promise.all([
        this.userRepo.findOneByEmail(email),
        this.userRepo.findOneByUsername(username)
      ]);
      if (userByEmail) {
        return left(new SignupError.EmailAlreadyExists(email));
      }
      if (userByUsername) {
        return left(new SignupError.UsernameAlreadyExists(username));
      }

      if (emailResult.isLeft()) {
        return;
      }
      const emailValue = emailResult.value.getValue();
      const role = Role.create('ADMIN').value.getValue() as Role;
      const hashedPassword = await this.passwordService.hash(password);
      const user = User.create({
        email: emailValue,
        password: hashedPassword,
        username,
        role
      });

      const savedUser = await this.userRepo.create(user);
      return right(Result.ok(savedUser));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
