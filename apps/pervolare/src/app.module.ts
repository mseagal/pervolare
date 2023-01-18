import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacteristicController } from './controllers/characteristic/characteristic.controller';
import { CharacteristicService } from './services/characteristic/characteristic.service';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name : 'CHARACTERISTIC_SERVICE',
        transport: Transport.TCP,
        options: {
          port : 3002
        }
      },
      { 
        name : 'PRODUCT_SERVICE' ,
        transport: Transport.TCP,
        options: {
          port : 3001
        }
      }
    ]),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, CharacteristicController, ProductController],
  providers: [
    AppService,
    CharacteristicService,
    ProductService
  ]
})
export class AppModule {}
