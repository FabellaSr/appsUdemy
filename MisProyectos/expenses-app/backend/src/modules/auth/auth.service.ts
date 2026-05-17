import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser, AuthUserDocument } from './schemas/user.schema';
import { hashPassword, comparePassword } from '../../utils/hash';
import { LoginDto, RegisterDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name) private model: Model<AuthUserDocument>,
    private jwt: JwtService,
  ) {}

  private sign(user: AuthUserDocument) {
    return this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
  }

  async register(dto: RegisterDto) {
    const exists = await this.model.findOne({ email: dto.email });
    if (exists) throw new ConflictException('Email ya registrado');
    const user = await this.model.create({
      email: dto.email,
      name: dto.name,
      passwordHash: await hashPassword(dto.password),
      role: dto.role,
    });
    return { accessToken: this.sign(user), user: this.toPublic(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.model.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    const ok = await comparePassword(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');
    return { accessToken: this.sign(user), user: this.toPublic(user) };
  }

  async me(id: string) {
    const user = await this.model.findById(id);
    if (!user) throw new UnauthorizedException();
    return this.toPublic(user);
  }

  private toPublic(u: AuthUserDocument) {
    return { id: u.id, email: u.email, name: u.name, role: u.role };
  }
}
