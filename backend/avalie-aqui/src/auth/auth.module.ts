import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtUserStrategy } from './strategies/jwt_user.strategy';
import { JwtAdminStrategy } from './strategies/jwt_admin.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, JwtAdminStrategy, JwtUserStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
