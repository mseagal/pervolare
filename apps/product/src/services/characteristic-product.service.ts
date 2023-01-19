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
    private characteristicProductRepository: Repository<CharacteristicProduct>
  ) {}

  async addCharacteristicToProduct(
    addCharacteristicToProductDto: AddCharacteristicToProductDto,
  ) {
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
    return addCharacteristicToProductDto;
  }

  async removeCharacteristicToProduct(
    removeCharacteristicFromProductDto: RemoveCharacteristicFromProductDto,
  ) {
    await this.characteristicProductRepository.delete(
        removeCharacteristicFromProductDto.characteristicProductIds,
    );
    return removeCharacteristicFromProductDto;
  }

  async verifyProductAlreadyHasCharacteristic(productId:number,characteristicId:number){
    return await this.characteristicProductRepository.findOneBy({productId,characteristicId});
  }

  async findAllCharacteristicsOfProduct(productId:number){
    return this.characteristicProductRepository.findBy({productId});
  }
}
