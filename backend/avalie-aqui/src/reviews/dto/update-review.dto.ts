import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'ID da Avaliação',
    type: 'int',
    example: 1,
    required: true,
  })
  id: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({
    description: 'Nota de Avaliação',
    type: 'float',
    example: 5,
    required: true,
  })
  rating?: number;

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
  comments?: string;
}
