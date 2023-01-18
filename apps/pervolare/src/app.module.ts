import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacteristicController } from './controllers/characteristic/characteristic.controller';
import { CharacteristicService } from './services/characteristic/characteristic.service';

@Module({
  imports: [
    ClientsModule.register([
      { name : 'CHARACTERISTIC_SERVICE' ,transport: Transport.TCP }
    ])
  ],
  controllers: [AppController, CharacteristicController],
  providers: [AppService,CharacteristicService],
})
export class AppModule {}
