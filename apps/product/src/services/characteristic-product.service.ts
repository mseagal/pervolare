import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacteristicProduct } from '../entities/characteristic-product.entity';
import { Product } from '../entities/product.entity';
import { ProductService } from './product.service';

@Injectable()
export class CharacteristicProductService {
    constructor(
        @InjectRepository(CharacteristicProduct)
        private characteristicProductRepository: Repository<CharacteristicProduct>,
        private readonly productService : ProductService
    ) {
    }

    /**
     * It takes a productId and an array of characteristicIds, creates a new characteristicProduct for
     * each characteristicId, and then returns the product
     * @param {number} productId - The id of the product to which the characteristics will be added.
     * @param {number[]} characteristicIds - the ids of the characteristics that you want to add to the
     * product
     * @returns The product with the new characteristics
     */
    async addCharacteristicToProduct(productId:number,characteristicIds:number[]): Promise<Product> {
        characteristicIds.forEach(async characteristicId => {
            const characteristicProduct = this.characteristicProductRepository.create({productId,characteristicId});
            await this.characteristicProductRepository.save(characteristicProduct);
        });
        return await this.productService.findOne(productId);
    }

    async removeCharacteristicToProduct(productId:number,characteristicProductIds:number[]): Promise<Product> {
        await this.characteristicProductRepository.softDelete(characteristicProductIds);
        return await this.productService.findOne(productId);
    }
}
