import { Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { Argon2PasswordService } from './services/password.service';
import { LoginController } from './useCases/login/login.controller';
import { LoginUseCase } from './useCases/login/login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './guards/jwt-auth.guard';
import { SignupController } from './useCases/signup/signup.controller';
import { SignupUseCase } from './useCases/signup/signup.usecase';
import { WhoamiController } from './useCases/whoami/whoami.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
    }),
    UsersModule
  ],
  controllers: [LoginController, SignupController, WhoamiController],
  providers: [
    LoginUseCase,
    SignupUseCase,
    JwtStrategy,
    AuthService,
    {
      provide: 'PASSWORD_SERVICE',
      useClass: Argon2PasswordService
    }
  ]
})
export class AuthModule {}
