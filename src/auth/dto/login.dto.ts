import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john@example.com', description: 'El email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'La contraseña del usuario' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
