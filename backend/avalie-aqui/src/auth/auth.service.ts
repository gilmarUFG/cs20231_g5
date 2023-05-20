import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getByEmail(email);
    const hash = await bcrypt.hash(password, 10);
    if (user && user.password === hash) {
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
    const hash = await bcrypt.hash(password, 10);
    if (user && user.password === hash) {
      const payload = { id: user.id, email: user.email, name: user.name };
      return { access_token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException(
        'Verifique as credenciais e tente novamente',
      );
    }
  }
}
