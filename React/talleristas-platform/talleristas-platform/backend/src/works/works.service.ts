import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';
import { WorkPhoto } from './work-photo.entity';
import { CreateWorkDto, UpdateWorkDto } from './work.dto';
import { Role } from '../common/roles.enum';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(Work) private repo: Repository<Work>,
    @InjectRepository(WorkPhoto) private photoRepo: Repository<WorkPhoto>,
  ) {}

  findAll() {
    return this.repo.find({
      where: { isPublished: true },
      relations: ['photos', 'provider'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const work = await this.repo.findOne({
      where: { id },
      relations: ['photos', 'provider'],
    });
    if (!work) throw new NotFoundException('Work not found');
    return work;
  }

  async create(dto: CreateWorkDto, providerId: string) {
    if (!providerId) throw new ForbiddenException('Provider not linked');
    const work = this.repo.create({
      title: dto.title,
      description: dto.description,
      category: dto.category,
      provider: { id: providerId } as any,
      photos: dto.photoUrls?.map((url) => this.photoRepo.create({ url })) ?? [],
    });
    return this.repo.save(work);
  }

  async update(id: string, dto: UpdateWorkDto, user: { role: Role; providerId: string | null }) {
    const work = await this.findOne(id);
    if (user.role !== Role.ADMIN && work.provider.id !== user.providerId) {
      throw new ForbiddenException();
    }
    if (dto.photoUrls) {
      await this.photoRepo.delete({ work: { id: work.id } as any });
      work.photos = dto.photoUrls.map((url) => this.photoRepo.create({ url, work }));
    }
    Object.assign(work, {
      title: dto.title ?? work.title,
      description: dto.description ?? work.description,
      category: dto.category ?? work.category,
      isPublished: dto.isPublished ?? work.isPublished,
    });
    return this.repo.save(work);
  }

  async remove(id: string, user: { role: Role; providerId: string | null }) {
    const work = await this.findOne(id);
    if (user.role !== Role.ADMIN && work.provider.id !== user.providerId) {
      throw new ForbiddenException();
    }
    await this.repo.remove(work);
    return { ok: true };
  }
}
