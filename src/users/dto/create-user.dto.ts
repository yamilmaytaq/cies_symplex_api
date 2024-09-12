import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsBoolean, MinLength, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'El nombre del usuario' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'El email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'La contraseña del usuario' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 1, description: 'El ID del rol asociado al usuario' })
  @IsInt()  // Validamos que el role_id sea un entero
  role_id: number;

  @ApiProperty({ example: true, description: 'El estado del usuario (activo o inactivo)' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
