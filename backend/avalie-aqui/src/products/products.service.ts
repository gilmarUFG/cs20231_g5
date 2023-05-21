import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { slugify } from 'src/util/functions';

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

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
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
