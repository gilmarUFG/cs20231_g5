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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto';
import { JwtAdminAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Products')
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
          example: [
            {
              id: 1,
              name: 'RTX 4060 Ti',
              category: 'placa-de-video',
              image_url:
                'https://files.tecnoblog.net/wp-content/uploads/2023/05/geforce-rtx-4060-ti-back-1060x795.jpg',
            },
            {
              id: 2,
              name: 'Elden Ring Official Strategy Guide',
              category: 'livro',
              image_url:
                'https://m.media-amazon.com/images/I/41N2TM5JAaL._SY498_BO1,204,203,200_.jpg',
            },
          ],
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Houve um erro na listagem de produtos',
    content: {
      'application/json': {
        schema: {
          example: {
            message:
              'Houve um erro na listagem de produtos. Tente novamente mais tarde.',
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
            name: 'RTX 4060 Ti',
            category: 'placa-de-video',
            image_url:
              'https://files.tecnoblog.net/wp-content/uploads/2023/05/geforce-rtx-4060-ti-back-1060x795.jpg',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    // Documentação da resposta pro swagger
    description: 'Produto inválido',
    content: {
      'application/json': {
        schema: {
          example: {
            message: 'Produto inválido',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    // Documentação da resposta pro swagger
    description: 'Há algo errado na recuperação de dados desse produto',
    content: {
      'application/json': {
        schema: {
          example: {
            message:
              'Falha ao obter dados do produto. Tente novamente mais tarde.',
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
