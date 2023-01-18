import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}