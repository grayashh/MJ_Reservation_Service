import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  headcount: number;

  @Column()
  court: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;
}
