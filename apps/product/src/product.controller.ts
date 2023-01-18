import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddCharacteristicToProductDto } from './dto/add-characteristic-to-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { RemoveCharacteristicFromProductDto } from './dto/remove-characteristic-from-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CharacteristicProductService } from './services/characteristic-product.service';
import { ProductService } from './services/product.service';

@Controller('product')
export class ProductController {

  constructor(
    private readonly productService : ProductService,
    private readonly characteristicProductService : CharacteristicProductService
  ){}

  @MessagePattern('get_all_products')
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @MessagePattern('get_one_product')
  findOne(@Payload('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @MessagePattern('create_product')
  create(@Payload()  createProductDto : CreateProductDto){
    const productCreated = this.productService.create(createProductDto);
    return productCreated;
  }

  @MessagePattern('update_product')
  async update(@Payload() updateProductDto: UpdateProductDto ) {
    const productUpdated = await this.productService.update(updateProductDto);
    return productUpdated;
  }

  @MessagePattern('delete_product')
  remove(@Payload('id') id: string) {
    return this.productService.remove(+id);
  }
  
  @MessagePattern('add_characteristic_to_product')
  addCharacteristicToProduct(@Payload() addCharacteristicToProductDto: AddCharacteristicToProductDto){
    return this.characteristicProductService.addCharacteristicToProduct(addCharacteristicToProductDto);
  }

  @MessagePattern('remove_characteristic_to_product')
  removeCharacteristicToProduct(@Payload() removeCharacteristicFromProductDto: RemoveCharacteristicFromProductDto){
    return this.characteristicProductService.removeCharacteristicToProduct(removeCharacteristicFromProductDto);
  }
}
