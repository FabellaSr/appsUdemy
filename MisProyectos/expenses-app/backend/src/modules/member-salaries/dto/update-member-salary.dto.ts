import { PartialType } from '@nestjs/swagger';
import { MemberSalaryDto } from './member-salary.dto';

export class UpdateMemberSalaryDto extends PartialType(MemberSalaryDto) {}