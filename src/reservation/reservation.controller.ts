import { Controller, Post, Body } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FindReservationDto } from './dto/find-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  // create reservation
  @Post()
  create(@Body() reservationDto: CreateReservationDto) {
    return this.reservationService.create(reservationDto);
  }
  // find reservation
  @Post('find')
  find(@Body() reservationDto: FindReservationDto) {
    const { name, phone, password } = reservationDto;
    return this.reservationService.find(name, phone, password);
  }
}
