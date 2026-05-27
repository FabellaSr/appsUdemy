// modules/shared-funds/shared-funds.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../middleware/jwt-auth.guard";
import { RolesGuard } from "../../middleware/roles.guard";
import { Roles } from "../../middleware/roles.decorator";

import { SharedFundsService } from "./shared-funds.service";
import { SharedFundDto } from "./dto/shared-fund.dto";

@ApiTags("shared-funds")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("shared-funds")
export class SharedFundsController {
  constructor(private svc: SharedFundsService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Get("current")
  current(@Query("year") year: number, @Query("month") month: number) {
    return this.svc.getByMonth(Number(year), Number(month));
  }

  @Roles("ADMIN")
  @Post()
  create(@Body() dto: SharedFundDto) {
    return this.svc.create(dto);
  }

  @Roles("ADMIN")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: Partial<SharedFundDto>) {
    return this.svc.update(Number(id), dto);
  }

  @Roles("ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(Number(id));
  }
}
