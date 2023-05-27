import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.types';
import { User, AdminUser } from '@prisma/client';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

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

  async validateAdmin(email: string): Promise<Omit<AdminUser, 'password'>> {
    const admin = await this.userService.getByEmail(email);
    if (admin) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
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

  async loginAdmin(data: LoginDto) {
    const { email, password } = data;

    const admin = await this.prisma.adminUser.findUnique({
      where: {
        email: email,
      },
    });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload: JwtPayload = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      };
      return { access_token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException(
        'Verifique as credenciais e tente novamente',
      );
    }
  }
}
