import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto, UpdateProviderDto } from './provider.dto';
import { UsersService } from '../users/users.service';
import { Role } from '../common/roles.enum';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider) private repo: Repository<Provider>,
    private users: UsersService,
  ) {}

  findAllPublic() {
    return this.repo.find({
      where: { isActive: true },
      relations: ['works', 'works.photos'],
      order: { createdAt: 'DESC' },
    });
  }

  findAllAdmin() {
    return this.repo.find({ relations: ['user'], order: { createdAt: 'DESC' } });
  }

  async findOne(id: string, includePrivate = false) {
    const provider = await this.repo.findOne({
      where: { id },
      relations: ['works', 'works.photos', ...(includePrivate ? ['user'] : [])],
    });
    if (!provider) throw new NotFoundException('Provider not found');
    return provider;
  }

  async create(dto: CreateProviderDto) {
    const user = await this.users.create({
      email: dto.email,
      password: dto.password,
      role: Role.PROVIDER,
    });
    const provider = this.repo.create({
      fullName: dto.fullName,
      trade: dto.trade,
      bio: dto.bio,
      phone: dto.phone,
      city: dto.city,
      user,
    });
    return this.repo.save(provider);
  }

  async update(id: string, dto: UpdateProviderDto, currentUser: { userId: string; role: Role; providerId: string | null }) {
    const provider = await this.findOne(id, true);
    if (currentUser.role !== Role.ADMIN && currentUser.providerId !== provider.id) {
      throw new ForbiddenException('Cannot edit other provider');
    }
    // Sólo admin puede tocar isActive
    if (currentUser.role !== Role.ADMIN) delete dto.isActive;
    Object.assign(provider, dto);
    return this.repo.save(provider);
  }

  async softDelete(id: string) {
    const provider = await this.findOne(id);
    provider.isActive = false;
    return this.repo.save(provider);
  }
}
