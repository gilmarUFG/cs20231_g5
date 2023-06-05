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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { JwtUserAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiAcceptedResponse({
    // Documentação da resposta pro swagger
    description: 'Cadastro realizado com sucesso',
    content: {
      'application/json': {
        schema: {
          example: {
            id: 1,
            message: 'Avaliação cadastrada com sucesso.',
          },
        },
      },
    },
  })
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('User access-token')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  getReview(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('User access-token')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtUserAuthGuard)
  @ApiBearerAuth('User access-token')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
