import { Controller, Post, Body } from '@nestjs/common';
import { CreateReservationDto } from 'src/dto/create-reservation.dto';
import { FindReservationDto } from 'src/dto/find-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() reservationDto: CreateReservationDto) {
    return this.reservationService.create(reservationDto);
  }

  @Post('find')
  find(@Body() reservationDto: FindReservationDto) {
    return this.reservationService.find(reservationDto);
  }
}
