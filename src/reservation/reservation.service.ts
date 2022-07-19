import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from 'src/dto/create-reservation.dto';
import { FindReservationDto } from 'src/dto/find-reservation.dto';

@Injectable()
export class ReservationService {
  async create(reservationDto: CreateReservationDto) {
    return reservationDto;
  }

  async find(reservationDto: FindReservationDto) {
    return reservationDto;
  }
}
