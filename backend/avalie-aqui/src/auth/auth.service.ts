import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JwtUserPayload } from './auth.types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getByEmail(email);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: LoginUserDto) {
    const { email, password } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user && bcrypt.compare(password, user.password)) {
      const payload: JwtUserPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return { access_token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException(
        'Verifique as credenciais e tente novamente',
      );
    }
  }
}
