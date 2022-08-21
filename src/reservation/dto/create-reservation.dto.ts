import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Court } from '../court.enum';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  readonly headcount: number;

  @IsString()
  readonly court: Court;

  @IsDate()
  readonly startDate: string;

  @IsDate()
  readonly endDate: string;
}
