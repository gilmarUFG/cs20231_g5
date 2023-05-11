import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto';
import { ApiAcceptedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Cadastrar um novo usuário
  @Post('register')
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Cadastro realizado com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            createdAt: '2021-08-31T00:00:00.000Z',
            message: 'Usuário cadastrado com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description: 'Caso o email e/ou CPF já estiverem em uso',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'O Email/CPF especificado já está em uso.',
          },
        },
      },
    },
  })
  register(@Body() dto: UserRegisterDto) {
    return this.userService.register(dto);
  }
}
