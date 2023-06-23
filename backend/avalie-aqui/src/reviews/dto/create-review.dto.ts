import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  isNotEmpty,
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'ID do avaliador',
    type: 'int',
    example: 1,
    required: true,
  })
  reviewerId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'ID do Produto Avaliado',
    type: 'int',
    example: 1,
    required: true,
  })
  ratedProductId: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({
    description: 'Nota de Avaliação',
    type: 'float',
    example: 4.5,
    required: true,
  })
  rating: number;

  @IsString()
  @MaxLength(500)
  @ApiProperty({
    description: 'Comentário da Avaliação',
    type: 'string',
    example: 'O produto é excelente! Recomendo!',
    required: false,
    maxLength: 500,
    minLength: 0,
  })
  comments: string;
}
