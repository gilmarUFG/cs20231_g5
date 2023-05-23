import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cadastrar um novo usuário
   * @param RegisterUserDto
   * @returns User
   */
  async register(registerUserDto: RegisterUserDto) {
    // Verificar se o email já existe
    if (await this.emailExists(registerUserDto.email)) {
      throw new HttpException(
        'O Email especificado já está em uso.',
        HttpStatus.FORBIDDEN,
      );
    }

    // Verificar se o CPF já existe
    if (await this.cpfExists(registerUserDto.cpf)) {
      throw new HttpException(
        'O CPF especificado já está em uso.',
        HttpStatus.FORBIDDEN,
      );
    }

    // Criptografar a senha
    const hash = await bcrypt.hash(registerUserDto.password, 10);

    // Remover os caracteres não numéricos do CPF
    const cpf = registerUserDto.cpf.replace(/\D/g, '');

    // Substituir a senha do DTO pelo hash
    registerUserDto = { ...registerUserDto, cpf: cpf, password: hash };

    try {
      // Cadastrar o usuário
      const user = await this.prisma.user.create({
        data: registerUserDto,
        select: {
          id: true,
        },
      });

      user['message'] = 'Usuário cadastrado com sucesso.';

      return user;
    } catch (error) {
      throw new HttpException(
        'Falha ao cadastrar usuário. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obter os dados de um usuário pelo ID
   * @param id number
   * @returns object
   */
  getUser(id: number) {
    // TODO: Verificar se o usuário é o mesmo que está logado (obter o usuário logado do guard e comparar com o id)
    if (true) {
      return this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
        },
      });
    } else {
      throw new HttpException(
        'Só é possível visualizar os seus próprios dados.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // --------------------------------------------------

  // Verifica se o email já existe
  private async emailExists(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return !!user;
  }

  // Verifica se o CPF já existe
  private async cpfExists(cpf: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf: cpf,
      },
    });

    return !!user;
  }

  //Busca usuário pelo email
  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  //Busca admin pelo email
  async getAdminByEmail(email: string) {
    return await this.prisma.adminUser.findUnique({
      where: {
        email: email,
      },
    });
  }
}
