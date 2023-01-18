import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCharacteristicToProductDto } from '../dto/add-characteristic-to-product.dto';
import { RemoveCharacteristicFromProductDto } from '../dto/remove-characteristic-from-product.dto';
import { CharacteristicProduct } from '../entities/characteristic-product.entity';
import { Product } from '../entities/product.entity';
import { ProductService } from './product.service';

@Injectable()
export class CharacteristicProductService {
  constructor(
    @InjectRepository(CharacteristicProduct)
    private characteristicProductRepository: Repository<CharacteristicProduct>,
    private readonly productService: ProductService,
  ) {}

  async addCharacteristicToProduct(
    addCharacteristicToProductDto: AddCharacteristicToProductDto,
  ): Promise<Product> {
    addCharacteristicToProductDto.characteristicIds.forEach(
      async (characteristicId) => {
        if (!(await this.verifyProductAlreadyHasCharacteristic(addCharacteristicToProductDto.productId,characteristicId))) {
          const characteristicProduct =
            this.characteristicProductRepository.create({
              productId: addCharacteristicToProductDto.productId,
              characteristicId,
            });
  
          await this.characteristicProductRepository.save(characteristicProduct);
        }else{
          // No se guarda registro
        }
      }
    );
    return await this.productService.findOne(addCharacteristicToProductDto.productId);
  }

  async removeCharacteristicToProduct(
    removeCharacteristicFromProductDto: RemoveCharacteristicFromProductDto,
  ): Promise<Product> {
    await this.characteristicProductRepository.delete(
        removeCharacteristicFromProductDto.characteristicProductIds,
    );
    return await this.productService.findOne(removeCharacteristicFromProductDto.productId);
  }

  async verifyProductAlreadyHasCharacteristic(productId,characteristicId){
    return await this.characteristicProductRepository.findOneBy({productId,characteristicId});
  }
}
