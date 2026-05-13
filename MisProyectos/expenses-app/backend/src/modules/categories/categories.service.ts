import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>) {}
  list() { return this.repo.find(); }
  create(dto: CategoryDto) { return this.repo.save(this.repo.create(dto)); }
  async update(id: string, dto: Partial<CategoryDto>) {
    const c = await this.repo.findOneBy({ id });
    if (!c) throw new NotFoundException();
    Object.assign(c, dto);
    return this.repo.save(c);
  }
  remove(id: string) { return this.repo.delete(id); }
}
