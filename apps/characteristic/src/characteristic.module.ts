import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { Characteristic } from './entities/characteristic.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-pervolare',
      port: 3306,
      username: 'pervolare',
      password: 'pervolare',
      database: 'pervolare',
      entities: [Characteristic],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Characteristic])
  ],
  controllers: [CharacteristicController],
  providers: [CharacteristicService],
})
export class CharacteristicModule {}
