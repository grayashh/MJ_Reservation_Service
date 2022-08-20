import { Reservation } from './reservation.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}
  // create reservation
  async create(reservationDto: CreateReservationDto): Promise<void> {
    try {
      await this.reservationRepository.create(reservationDto).save();
      return;
    } catch (error: unknown) {
      throw new InternalServerErrorException();
    }
  }
  // get all reservation information
  async getAll(): Promise<Reservation[]> {
    try {
      return await this.reservationRepository.find();
    } catch (error: unknown) {
      throw new InternalServerErrorException();
    }
  }
  // find reservation by name, password
  async find(name: string, password: string): Promise<Reservation | boolean> {
    try {
      const result = await this.reservationRepository.findOne({
        where: {
          name,
          password,
        },
      });
      if (!result) {
        return false;
      }
      return result;
    } catch (error: unknown) {
      throw new InternalServerErrorException();
    }
  }
}
