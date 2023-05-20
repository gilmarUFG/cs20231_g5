import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({
    description: 'Email do Usuário',
    type: 'string',
    example: 'joaodasilva@gmail.com',
    format: 'email',
    maxLength: 150,
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(150)
  @ApiProperty({
    description: 'Senha do Usuário',
    type: 'string',
    example: 'senha123',
    minLength: 6,
    maxLength: 150,
    required: true,
  })
  password: string;
}
