import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployessDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployessDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return await this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.employee.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateEmployessDto: Prisma.EmployeeUpdateInput) {
    return await this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployessDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
