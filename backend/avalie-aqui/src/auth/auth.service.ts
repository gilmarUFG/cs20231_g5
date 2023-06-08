import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAdminPayload, JwtUserPayload } from './auth.types';
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

  /**
   * Valida o usuário
   * @param email string
   * @returns
   */
  async validateUser(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.getByEmail(email);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Valida o administrador
   * @param email string
   * @returns
   */
  async validateAdmin(email: string): Promise<Omit<AdminUser, 'password'>> {
    const admin = await this.userService.getAdminByEmail(email);
    if (admin) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  /**
   * Realiza o login do usuário
   * @param data LoginDto
   * @returns access_token
   */
  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtUserPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
        },
      };
    } else {
      throw new UnauthorizedException(
        'Verifique as credenciais e tente novamente',
      );
    }
  }

  /**
   * Realiza o login do administrador
   * @param data LoginDto
   * @returns access_token
   */
  async loginAdmin(data: LoginDto) {
    const { email, password } = data;

    const admin = await this.prisma.adminUser.findUnique({
      where: {
        email: email,
      },
    });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload: JwtAdminPayload = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      };
    } else {
      throw new UnauthorizedException(
        'Verifique as credenciais e tente novamente',
      );
    }
  }
}
