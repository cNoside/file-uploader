import { User } from 'modules/users/models';
import { AppError } from 'shared/app.error';
import { GetCurrentUserByIdErrors } from './get-user-by-id.error';
import { Result, Either, left, right } from 'shared/result';
import { InjectUserRepo } from 'modules/users/decorators/inject-user-repo.decorator';
import { IUserRepo } from 'modules/users/repositories/user.repository';
import { UseCase } from 'shared/base/usecase.base';
import { ID } from '../../models/id/id.model';
import { IDValidationError } from 'modules/users/models/id/id.error';

type GetUserByIdResult = Either<
  | GetCurrentUserByIdErrors.UserDoesNotExist
  | IDValidationError
  | AppError.DatabaseError
  | AppError.UnexpectedError,
  Result<User>
>;

export class GetUserByIdUseCase extends UseCase<number, GetUserByIdResult> {
  constructor(
    @InjectUserRepo()
    private readonly userRepo: IUserRepo
  ) {
    super();
  }

  public async execute(id: number): Promise<GetUserByIdResult> {
    try {
      try {
        const idResult = ID.create(id);

        if (idResult.isLeft()) {
          return left(new IDValidationError(idResult.value.getValue().issues));
        }

        const user = await this.userRepo.findOneById(id);

        if (!user) {
          return left(new GetCurrentUserByIdErrors.UserDoesNotExist(id));
        }

        return right(Result.ok<User>(user));
      } catch (err) {
        return left(new AppError.DatabaseError(err));
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
