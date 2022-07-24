import { Reservation } from './reservation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}
  // create reservation
  async create(reservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationRepository.save(reservationDto);
  }
  // find reservation
  async find(
    name: string,
    phone: string,
    password: string,
  ): Promise<Reservation[]> {
    const result = await this.reservationRepository.find({
      where: {
        name,
        phone,
        password,
      },
    });
    if (!result) {
      return;
    }
    return result;
  }
}
