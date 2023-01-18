import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { CharacteristicModule } from './characteristic.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CharacteristicModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002
      }
    }
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
