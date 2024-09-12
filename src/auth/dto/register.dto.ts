import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John', description: 'El nombre del usuario' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'El email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'La contraseña del usuario' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 1, description: 'El ID del rol asociado al usuario' })
  @IsInt()
  role_id: number;
}
