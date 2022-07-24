import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  readonly headcount: number;

  @IsString()
  readonly court: string;

  @IsDate()
  readonly startDate: string;

  @IsDate()
  readonly endDate: string;
}
