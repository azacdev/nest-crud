import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

// Type for user

export class CreateUserDto {
  // validators
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], { message: 'Valid role required' })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
