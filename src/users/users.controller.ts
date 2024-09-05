import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  /*
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
     */
  constructor(private readonly userService: UsersService) {}

  // GET /users all users
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  // GET /users/:id user by id
  // ParseIntPipe changes the id to number
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // POST /users user by
  // ValidationPipe validate agaisnt our Dto
  @Post()
  createUser(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  // PATCH /users/:id user by id
  // ParseIntPipe changes the id to number
  @Patch(':id')
  findOneAndUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserto: UpdateUserto,
  ) {
    return this.userService.findOneAndUpdate(id, updateUserto);
  }

  // DELETE /users/:id user by id
  // ParseIntPipe changes the id to number
  @Delete(':id')
  findOneAndDelete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneAndDelete(id);
  }
}
