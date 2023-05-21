import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
      let user = await this.prisma.user.create({
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
}
