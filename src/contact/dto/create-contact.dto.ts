import { IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly message: string;
}
