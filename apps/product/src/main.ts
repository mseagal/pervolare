import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'microservice-product',
        port: 3001
      }
    }
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
