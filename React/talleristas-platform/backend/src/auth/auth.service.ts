import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !user.isActive) throw new UnauthorizedException('Invalid credentials');
    const ok = await this.users.validatePassword(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      providerId: user.provider?.id ?? null,
    };
    return {
      access_token: await this.jwt.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        providerId: user.provider?.id ?? null,
      },
    };
  }

  async me(userId: string) {
    const user = await this.users.findById(userId);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      providerId: user.provider?.id ?? null,
    };
  }
}
