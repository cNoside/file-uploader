import { Either, Result } from 'shared/result';
import { GetCurrentUserError } from './get-current-user.errors';
import { AppError } from '../../../../shared/app.error';
import { User } from 'modules/users/models';
import { Request } from 'express';
import { InjectUserRepo } from 'modules/users/decorators/inject-user-repo.decorator';
import { IUserRepo } from 'modules/users/repositories/user.repository';

type GetCurrentUserResult = Either<
  | GetCurrentUserError.UserDoesNotExist
  | AppError.UnexpectedError
  | AppError.DatabaseError,
  Result<User>
>;

// export class GetCurrentUserUseCase extends UseCase<
//   Request,
//   GetCurrentUserResult
// > {
//   constructor(
//     @InjectUserRepo()
//     private readonly userRepo: IUserRepo
//   ) {
//     super();
//   }

//   // public async execute(req: Request): Promise<GetCurrentUserResult> {
//   //   const id = req.user?.id
//   // }
// }
