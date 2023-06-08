import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria uma nova avaliação
   * @param createReviewDto
   * @returns
   */
  async create(createReviewDto: CreateReviewDto) {
    try {
      let review = await this.prisma.review.create({
        data: createReviewDto,
        select: {
          id: true,
        },
      });

      review['message'] = 'Avaliação realizada com sucesso.';

      return review;
    } catch (error) {
      throw new HttpException(
        'Falha ao realizar avaliação. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obter todas as avaliações cadastradas
   * @returns array
   */
  async findAll() {
    try {
      return await this.prisma.review.findMany({
        select: {
          id: true,
          reviewer: {
            select: {
              id: true,
              name: true,
            },
          },
          ratedProduct: {
            select: {
              id: true,
              name: true,
              category: true,
              image_url: true,
            },
          },
          rating: true,
          comments: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Houve um erro na listagem de avaliações. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obter uma avaliação pelo id
   * @param id
   * @returns
   */
  async findOne(id: number) {
    try {
      const review = await this.prisma.review.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          reviewer: {
            select: {
              id: true,
              name: true,
            },
          },
          ratedProduct: {
            select: {
              id: true,
              name: true,
              category: true,
              image_url: true,
            },
          },
          rating: true,
          comments: true,
        },
      });
      if (review) {
        return review;
      }
      throw new HttpException('Avaliação inválida.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        'Falha ao obter dados da avaliação. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
