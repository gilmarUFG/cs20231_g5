import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

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
        'Falha ao incluir avaliação. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        reviewer: true,
        ratedProduct: true,
        rating: true,
        comments: true
      }
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
