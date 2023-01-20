import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CharacteristicDto } from '../dto/characteristic.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductWithCombinationsDto } from '../dto/product-with-combinations.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { CharacteristicTypeSpanish } from '../enums/characteristic-type-spanish';
import { CharacteristicProductService } from './characteristic-product.service';
import { CharacteristicService } from './characteristic.service';

@Injectable()
export class ProductService {
   
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private characteristicProductService : CharacteristicProductService,
        private characteristicService : CharacteristicService
    ) {
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<ProductWithCombinationsDto> {
        const product = await this.productRepository.findOneBy({ id });
        const characteristicsOfProduct = await this.characteristicProductService.findAllCharacteristicsOfProduct(id);
        let productTemp = new Map();
        let combinations: string[] = [];
        if (characteristicsOfProduct.length) {
            const characteristics = await this.characteristicService.getCharacteristicsByIds(characteristicsOfProduct.map((item) => item.characteristicId)).toPromise();
            characteristics.forEach(characteristic => {
                let type: string = CharacteristicTypeSpanish[characteristic.type] ?? characteristic.type;
                this.addAttribute(productTemp,product.name, type , characteristic.name);
            });
            combinations = this.generateCombinations(productTemp,product.name);
        }else{
            // No available combinations
        }

        if (product) {
            return { ...product, characteristics: characteristicsOfProduct, combinations };
        }else{
            return null;
        }
        
    }

    private addAttribute(productTemp,product, type, value) {
        if (!productTemp.has(product)) {
            productTemp.set(product, new Map());
        }
        let productData = productTemp.get(product);
        if (!productData.has(type)) {
            productData.set(type, []);
        }
        productData.get(type).push(value);
    }

    private generateCombinations(productTemp,product) {
        let combinations = [];
        let productData = productTemp.get(product);
        if (!productData) {
            return [product];
        }
        let keys = Array.from(productData.keys());
        if (keys.length === 0) {
            return [product];
        } else {
            let tempCombinations = [];
            let firstAttribute = keys[0];
            for (let j = 0; j < productData.get(firstAttribute).length; j++) {
                tempCombinations.push(product + " " + firstAttribute + " " + productData.get(firstAttribute)[j]);
            }
            for (let j = 1; j < keys.length; j++) {
                let newCombinations = [];
                for (let k = 0; k < tempCombinations.length; k++) {
                    for (let l = 0; l < productData.get(keys[j]).length; l++) {
                        newCombinations.push(tempCombinations[k] + " - " + keys[j] + " " + productData.get(keys[j])[l]);
                    }
                }
                tempCombinations = newCombinations;
            }
            combinations = combinations.concat(tempCombinations);
        }
        return combinations;
    }

    create(createProductDto: CreateProductDto) {
        const productCreated = this.productRepository.create(createProductDto);
        this.productRepository.save(productCreated);
        return productCreated;
    }

    async update(updateProductDto: UpdateProductDto) : Promise<Product> {
        await this.productRepository.update(updateProductDto.id,updateProductDto);
        return this.findOne(updateProductDto.id);
    }

    /**
     * It takes a productId as a parameter, and then it calls the softDelete function in the
     * productRepository, and then it returns the result of that function
     * @param {number} productId - The id of the product to be deleted.
     * @returns UpdateResult
     */
    async remove(productId: number): Promise<UpdateResult> {
        return await this.productRepository.softDelete(productId);
    }
}
