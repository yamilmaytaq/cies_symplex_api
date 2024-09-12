import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'El nombre del rol' })
  @IsString()
  @MaxLength(50)
  role_name: string;
}
