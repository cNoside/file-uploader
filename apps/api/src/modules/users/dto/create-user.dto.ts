import { IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*/, {
    message:
      'password must contain at least 1 uppercase, lowercase, number and special character (!@#$%^&*)'
  })
  password: string;

  @IsEnum(Role)
  role: Role;
}
