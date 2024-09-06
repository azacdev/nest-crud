import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

import { EmployeesService } from './employees.service';

// Skip rate limiter for all routes
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployessDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployessDto);
  }

  // Dont skip rate limiter for this route
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role);
  }

  // Override rate limiter for this route
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployessDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(id, updateEmployessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
