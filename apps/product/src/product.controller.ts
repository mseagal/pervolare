import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddCharacteristicToProductDto } from './dto/add-characteristic-to-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { RemoveCharacteristicToProductDto } from './dto/remove-characteristic-to-product.dto';
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
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  create(@Body()  createProductDto : CreateProductDto){
    const productCreated = this.productService.create(createProductDto);
    return productCreated;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto ) {
    const productUpdated = await this.productService.update(+id,updateProductDto);
    return productUpdated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  
  @Post(':id/characteristic')
  addCharacteristicToProduct(@Param('id') id: string, @Body() addCharacteristicToProductDto: AddCharacteristicToProductDto){
    return this.characteristicProductService.addCharacteristicToProduct(+id,addCharacteristicToProductDto.characteristicIds);
  }

  @Delete(':id/characteristic')
  removeCharacteristicToProduct(@Param('id') id: string, @Body() addCharacteristicToProductDto: RemoveCharacteristicToProductDto){
    return this.characteristicProductService.removeCharacteristicToProduct(+id,addCharacteristicToProductDto.characteristicIds);
  }
}
