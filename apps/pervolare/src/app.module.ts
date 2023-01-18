import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacteristicController } from './controllers/characteristic/characteristic.controller';
import { CharacteristicService } from './services/characteristic/characteristic.service';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [
    ClientsModule.register([
      { name : 'CHARACTERISTIC_SERVICE' ,transport: Transport.TCP },
      { name : 'PRODUCT_SERVICE' ,transport: Transport.TCP }
    ])
  ],
  controllers: [AppController, CharacteristicController, ProductController],
  providers: [AppService,CharacteristicService, ProductService],
})
export class AppModule {}
