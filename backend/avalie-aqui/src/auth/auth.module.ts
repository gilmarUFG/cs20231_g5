import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtUserStrategy } from './strategies/jwt_user.strategy';
import { AdminUserModule } from '../admin_user/admin_user.module';
import { JwtAdminStrategy } from './strategies/jwt_admin.strategy';

@Module({
  imports: [
    UserModule,
    AdminUserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, JwtAdminStrategy, JwtUserStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
