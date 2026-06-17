import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { hashPassword, comparePassword } from '../../utils/hash';
import { LoginDto, RegisterDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  private sign(user: UserEntity) {
    return this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
  }

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email ya registrado');

    const user = this.userRepo.create({
      email: dto.email,
      name: dto.name,
      passwordHash: await hashPassword(dto.password),
      role: dto.role as 'ADMIN' | 'MEMBER',
    }) ; 

    await this.userRepo.save(user);

    return { accessToken: this.sign(user), user: this.toPublic(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await comparePassword(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    return { accessToken: this.sign(user), user: this.toPublic(user) };
  }

  async me(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException();
    return this.toPublic(user);
  }

  private toPublic(u: UserEntity) {
    return { id: u.id, email: u.email, name: u.name, role: u.role };
  }
}
