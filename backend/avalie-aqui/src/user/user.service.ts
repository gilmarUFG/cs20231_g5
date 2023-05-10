import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  // Cadastrar um novo usuário
  async register(dto: UserRegisterDto) {
    
    // Verificar se o email já existe
    if (await this.emailExists(dto.email)) {
      throw new HttpException('O Email especificado já está em uso.', HttpStatus.FORBIDDEN);
    }
    
    // Verificar se o CPF já existe
    if (await this.cpfExists(dto.cpf)) {
      throw new HttpException('O CPF especificado já está em uso.', HttpStatus.FORBIDDEN);
    }
    
    // Criptografar a senha
    const hash = await bcrypt.hash(dto.password, 10);

    // Substituir a senha do DTO pelo hash
    dto = { ...dto, password: hash };

    try {
      
      // Cadastrar o usuário
      const user = await this.prisma.user.create({
        data: dto,
        select: {
          id: true,
          createdAt: true,
        },
      });
      
      return user;
      
    } catch (error) {
      throw new HttpException('Falha ao cadastrar usuário. Tente novamente mais tarde.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  
  // Verifica se o email já existe
  async emailExists(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
    });
    
    return !!user;
  }
  
  // Verifica se o CPF já existe
  async cpfExists(cpf: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf: cpf
      },
    });
    
    return !!user;
  }
}
