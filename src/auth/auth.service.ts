import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService, 
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email, role: user.role.role_name };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
      role: user.role.role_name,
    };
  }

  async profile({ email }: { email: string }) {
    return await this.usersService.findOneByEmail(email);
  }
}
