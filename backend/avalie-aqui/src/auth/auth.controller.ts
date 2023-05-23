import { LoginUserDto } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login de usuário
  @Post('login')
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Login realizado com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            access_token: 'token',
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    // Documentação da resposta pro swagger
    description: 'Caso o email e/ou senha estejam incorretos',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 401,
            message: 'Verifique as credenciais e tente novamente',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao logar o usuário',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível logar o usuário. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  async login(@Body() data: LoginUserDto) {
    return await this.authService.login(data);
  }
}
