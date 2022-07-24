import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation/reservation.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
