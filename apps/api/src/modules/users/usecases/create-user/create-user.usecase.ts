import { User } from 'modules/users/models';
import { Result } from 'shared/result';
import { Either, left, right } from '../../../../shared/result';
import { CreateUserError } from './create-user.errors';
import { UseCase } from 'shared/base/usecase.base';
import { CreateUserDTO } from './create-user.dto';
import { InjectUserRepo } from 'modules/users/decorators/inject-user-repo.decorator';
import { IUserRepo } from 'modules/users/repositories/user.repository';
import { Email } from '../../models/email/email.model';
import { ModelValidationError } from 'shared/model-validation.error';
import { AppError } from 'shared/app.error';
import {
  ValidationError,
  IValidationError
} from '../../../../shared/validation.error';
import { Role } from 'modules/users/models/role/role.model';

type CreateUserResult = Either<
  | CreateUserError.UserValidationError
  | CreateUserError.UsernameTaken
  | AppError.UnexpectedError
  | AppError.DatabaseError,
  Result<User>
>;

export class CreateUserUseCase extends UseCase<
  CreateUserDTO,
  CreateUserResult
> {
  constructor(
    @InjectUserRepo()
    private readonly userRepo: IUserRepo
  ) {
    super();
  }

  public async execute(request: CreateUserDTO): Promise<CreateUserResult> {
    try {
      const { username, email, password, role } = request;

      const validationErrors: IValidationError[] = [];

      const emailResult = Email.create(email);

      if (emailResult.isLeft()) {
        const error = emailResult.value.getValue();
        validationErrors.push(error);
      }

      const roleResult = Role.create(role);

      if (roleResult.isLeft()) {
        const error = roleResult.value.getValue();
        validationErrors.push(error);
      }

      if (validationErrors.length > 0) {
        return left(new CreateUserError.UserValidationError(validationErrors));
      }

      if (emailResult.isLeft() || roleResult.isLeft()) {
        return;
      }

      const emailValue = emailResult.value.getValue();

      const roleValue = roleResult.value.getValue();

      const user = User.create({
        username,
        email: emailValue,
        password,
        role: roleValue
      });

      try {
        const [userByUsername, userByEmail] = await Promise.all([
          this.userRepo.findOneByUsername(username),
          this.userRepo.findOneByEmail(email)
        ]);

        if (userByUsername) {
          return left(new CreateUserError.UsernameTaken(username));
        }

        if (userByEmail) {
          return left(new CreateUserError.EmailTaken(email));
        }

        const createdUser = await this.userRepo.create(user);

        return right(Result.ok(createdUser));
      } catch (err) {
        return left(new AppError.DatabaseError(err));
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
