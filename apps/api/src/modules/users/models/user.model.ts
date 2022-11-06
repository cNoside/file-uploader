import { IUserDTO } from '../dto/user.dto';
import { Email } from './email/email.model';
import { UserMapper } from '../mappers/user.mapper';
import { Role } from './role/role.model';
import { Id } from 'modules/files/value-objects';

export interface IUserProps {
  id?: Id;
  username: string;
  email: Email;
  password: string;
  role: Role;
}

export class User {
  protected constructor(private readonly props: IUserProps) {}

  get id(): number {
    return this.props.id?.value;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email.value;
  }

  get role(): string {
    return this.props.role.value;
  }

  get hashedPassword(): string {
    return this.props.password;
  }

  public toDTO(): IUserDTO {
    return UserMapper.toDTO(this);
  }

  public static create(props: IUserProps): User {
    return new User(props);
  }
}

export class UserModel extends User {
  constructor(props: IUserProps) {
    super(props);
  }
}
