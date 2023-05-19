import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiAcceptedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Produto cadastrado com Sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            createdAt: '2021-08-31T00:00:00.000Z',
            message: 'produto cadastrado com sucesso.',
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
            message: 'listagem de produtos ocncluída com sucesso.',
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
            message: 'Houve um erro na litagem de produtos',
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
    description: 'Produto inexistente ou há algo errado na recuperação de dados desse produto',
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

  @Patch(':id')
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
    description: 'Não foi possível alterar este produto, verifique suas permissões e/ou as caractetísticas do produto',
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
