import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';  // Importar decoradores de Swagger
import { Request } from 'express';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión de usuario' }) 
  @ApiResponse({ status: 200, description: 'Login exitoso.' }) 
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @Auth(Role.USER)
  @ApiOperation({ summary: 'Obtener perfil de usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente.' })
  @ApiResponse({ status: 401, description: 'Token no válido o usuario no autenticado.' })
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
