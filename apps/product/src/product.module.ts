import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CharacteristicProduct } from './entities/characteristic-product.entity';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './services/product.service';
import { CharacteristicProductService } from './services/characteristic-product.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pervolare-product',
      entities: [Product,CharacteristicProduct],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product,CharacteristicProduct])
],
  controllers: [ProductController],
  providers: [ProductService, CharacteristicProductService],
  exports: [ProductService]
})
export class ProductModule {}
