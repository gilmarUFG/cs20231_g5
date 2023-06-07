import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';

@ApiTags('Users')
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
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao cadastrar o usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível cadastrar o usuário. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Get(':id')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('User access-token')
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Dados do usuário obtidos com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            name: 'João da Silva',
            email: 'joaodasilva@gmail.com',
            cpf: '69796737000',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description: 'Caso tente visualizar os dados de outro usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'Só é possível visualizar os seus próprios dados.',
          },
        },
      },
    },
  })
  getUser(@Param('id') id: number, @Request() req: any) {
    return this.userService.getUser(id, req);
  }
}
