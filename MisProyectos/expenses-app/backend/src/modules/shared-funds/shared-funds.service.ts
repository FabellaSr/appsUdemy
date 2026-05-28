// modules/shared-funds/shared-funds.service.ts

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SharedFundEntity } from './shared-fund.entity';
import { SharedFundDto } from './dto/shared-fund.dto';
import { MemberSalariesService } from '../member-salaries/member-salaries.service';

export interface SalaryBreakdownItem {
  userId: string;
  name: string;
  salary: number;
  percentage: number;   // e.g. 66.67
  contribution: number; // monto que le toca pagar
}

export interface SharedFundBreakdown {
  year: number;
  month: number;
  targetAmount: number;
  totalSalaries: number;
  breakdown: SalaryBreakdownItem[];
}

@Injectable()
export class SharedFundsService {
  constructor(
    @InjectRepository(SharedFundEntity)
    private repo: Repository<SharedFundEntity>,
    private memberSalariesService: MemberSalariesService,
  ) {}

  list() {
    return this.repo.find({
      order: {
        year: 'DESC',
        month: 'DESC',
      },
    });
  }

  getByMonth(year: number, month: number) {
    return this.repo.findOne({
      where: {
        year,
        month,
      },
    });
  }

  create(dto: SharedFundDto) {
    return this.repo.save(
      this.repo.create(dto),
    );
  }

  async update(
    id: number,
    dto: Partial<SharedFundDto>,
  ) {
    const fund = await this.repo.findOneBy({ id });

    if (!fund) {
      throw new NotFoundException();
    }

    Object.assign(fund, dto);

    return this.repo.save(fund);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

    /**
   * Calcula cuánto debe aportar cada miembro al fondo mensual,
   * de forma proporcional a su salario.
   *
   * Ejemplo:
   *   - Usuario X gana $1.000 → 66.67% → aporta $533.33
   *   - Usuario Y gana $500  → 33.33% → aporta $266.67
   *   - targetAmount: $800
   */
  async getBreakdown(year: number, month: number): Promise<SharedFundBreakdown> {
    const fund = await this.repo.findOne({ where: { year, month } });
    if (!fund) {
      throw new NotFoundException(
        `No existe un fondo compartido para ${month}/${year}`,
      );
    }
 
    const salaries = await this.memberSalariesService.getByMonth(year, month);
    if (!salaries.length) {
      throw new NotFoundException(
        `No hay salarios cargados para ${month}/${year}`,
      );
    }
 
    const totalSalaries = salaries.reduce(
      (sum, s) => sum + Number(s.salary),
      0,
    );
 
    const targetAmount = Number(fund.targetAmount);
 
    const breakdown: SalaryBreakdownItem[] = salaries.map((s) => {
      const salary = Number(s.salary);
      const percentage = (salary / totalSalaries) * 100;
      const contribution = (salary / totalSalaries) * targetAmount;
 
      return {
        userId: s.userId,
        name: s.user?.name ?? s.userId,
        salary,
        percentage: Math.round(percentage * 100) / 100,       // 2 decimales
        contribution: Math.round(contribution * 100) / 100,   // 2 decimales
      };
    });
 
    return {
      year,
      month,
      targetAmount,
      totalSalaries: Math.round(totalSalaries * 100) / 100,
      breakdown,
    };
  }
}