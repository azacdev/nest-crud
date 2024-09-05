import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'azacdev', email: 'azacdev@gmail.com', role: 'INTERN' },
    { id: 2, name: 'MONARCH', email: 'MONARCH@gmail.com', role: 'INTERN' },
    { id: 3, name: 'SHADOW', email: 'SHADOW@gmail.com', role: 'ENGINEER' },
    { id: 4, name: 'emperor', email: 'emperor@gmail.com', role: 'ENGINEER' },
    { id: 5, name: 'SHRED', email: 'SHRED@gmail.com', role: 'ADMIN' },
    { id: 6, name: 'NAHH', email: 'NAHH@gmail.com', role: 'ADMIN' },
  ];

  findAll(role?: string) {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(reateUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...reateUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  findOneAndUpdate(id: number, updateUserto: UpdateUserto) {
    this.users = this.users.map((user) => {
      if (user.id === Number(id)) {
        return { ...user, ...updateUserto };
      }

      return user;
    });

    return this.findOne(id);
  }

  findOneAndDelete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
