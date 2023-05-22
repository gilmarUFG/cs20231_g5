import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto';
import {
  JwtUserAuthGuard,
  JwtAdminAuthGuard,
} from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Cadastra um novo produto
  @Post()
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth('Admin access-token')
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Produto cadastrado com Sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            createdAt: '2021-08-31T00:00:00.000Z',
            message: 'Produto cadastrado com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description: 'Caso o já exista um produto cadastrado com o mesmo nome',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'Já existe um produto com esse nome cadastrado',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Erro ao cadastrar o produto',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 500,
            message:
              'Não foi possível cadastrar o produto. Tente novamente mais tarde.',
          },
        },
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Listagem de produtos concluída com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            createdAt: '2021-08-31T00:00:00.000Z',
            message: 'listagem de produtos concluída com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description: 'Houve um erro na litagem de produtos',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'Houve um erro na listagem de produtos',
          },
        },
      },
    },
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Produto encontrado com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            createdAt: '2021-08-31T00:00:00.000Z',
            message: 'Produto encontrado com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description:
      'Produto inexistente ou há algo errado na recuperação de dados desse produto',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'Produto inexistente',
          },
        },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth('Admin access-token')
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Produto alterado com Sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            createdAt: '2021-08-31T00:00:00.000Z',
            message: 'Produto alterado com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description:
      'Não foi possível alterar este produto, verifique suas permissões e/ou as caractetísticas do produto',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'Não foi possível alterar esse produto',
          },
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth('Admin access-token')
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Produto excluido com Sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            createdAt: '2021-08-31T00:00:00.000Z',
            message: 'Produto excluído com sucesso.',
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    // Documentação da resposta pro swagger
    description: 'Produto Inexistente',
    content: {
      'application/json': {
        schema: {
          example: {
            statusCode: 403,
            message: 'Produto Inexistente',
          },
        },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
