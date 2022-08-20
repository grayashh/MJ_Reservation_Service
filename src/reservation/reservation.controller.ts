import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FindReservationDto } from './dto/find-reservation.dto';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  // create reservation
  @Post()
  create(@Body() reservationDto: CreateReservationDto): Promise<void> {
    return this.reservationService.create(reservationDto);
  }
  // get all reservation information
  @Get()
  getAll(): Promise<Reservation[]> {
    return this.reservationService.getAll();
  }
  // find reservation by name, password
  @Post('/find')
  find(
    @Body() reservationDto: FindReservationDto,
  ): Promise<Reservation | boolean> {
    const { name, password } = reservationDto;
    return this.reservationService.find(name, password);
  }
}
