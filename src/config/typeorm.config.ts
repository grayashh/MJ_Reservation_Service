import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'bk',
  password: 'bk',
  database: 'mj-reservation-service',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  timezone: 'Asia/Seoul',
};
