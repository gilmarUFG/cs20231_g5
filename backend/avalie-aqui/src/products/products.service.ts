import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { slugify } from '../util/functions';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cadastrar um novo produto
   * @param createProductDto
   * @returns
   */
  async create(createProductDto: CreateProductDto) {
    // Verificar se o nome já existe
    if (await this.nameExists(createProductDto.name)) {
      throw new HttpException(
        'O Nome especificado já está em uso.',
        HttpStatus.FORBIDDEN,
      );
    }

    // Transformar o nome da categoria em slug
    const category_slug = slugify(createProductDto.category);
    createProductDto.category = category_slug;

    try {
      // Cadastrar o usuário
      let product = await this.prisma.product.create({
        data: createProductDto,
        select: {
          id: true,
        },
      });

      product['message'] = 'Produto cadastrado com sucesso.';

      return product;
    } catch (error) {
      throw new HttpException(
        'Falha ao cadastrar produto. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obter todos os produtos cadastrados
   * @returns array
   */
  async findAll() {
    try {
      return await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          category: true,
          image_url: true,
        },
        /* orderBy: {
          id: 'desc',
        }, */
      });
    } catch (error) {
      throw new HttpException(
        'Houve um erro na listagem de produtos. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obter as avaliações de um produto
   * @param id integer
   * @returns Product
   */
  getReviews(id: number) {
    try {
      const productReviews = this.prisma.product.findUnique({
        where: {
          id: id,
        },
        select: {
          reviews: {
            select: {
              id: true,
              reviewer: {
                select: {
                  id: true,
                  name: true,
                },
              },
              rating: true,
              comments: true,
            },
          },
        },
      });
      if (productReviews) {
        return productReviews;
      }
      throw new HttpException('Produto inválido.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        'Falha ao obter as avaliações do produto. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obter um produto pelo id
   * @param id integer
   * @returns Product
   */
  findOne(id: number) {
    try {
      const product = this.prisma.product.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          category: true,
          image_url: true,
        },
      });
      if (product) {
        return product;
      }
      throw new HttpException('Produto inválido.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        'Falha ao obter dados do produto. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // --------------------------------------------------

  // Verifica se o nome já existe
  private async nameExists(name: string) {
    const user = await this.prisma.product.findUnique({
      where: {
        name: name,
      },
    });

    return !!user;
  }
}
