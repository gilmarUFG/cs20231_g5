import { IsCPF } from 'brazilian-class-validator';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  cpf: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(150)
  password: string;
}
