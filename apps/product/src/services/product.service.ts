import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        return this.productRepository.findOneBy({ id });
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
