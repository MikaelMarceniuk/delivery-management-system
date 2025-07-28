import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 0,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
