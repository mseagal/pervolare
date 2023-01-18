import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddCharacteristicToProductDto } from '../../dto/product/add-characteristic-to-product.dto';
import { CreateProductDto } from '../../dto/product/create-product.dto';
import { ProductDto } from '../../dto/product/product.dto';
import { RemoveCharacteristicFromProductDto } from '../../dto/product/remove-characteristic-from-product.dto';
import { UpdateProductDto } from '../../dto/product/update-product.dto';
import { ProductService } from '../../services/product/product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService : ProductService
    ){}

    @Get()
    findAll(): Observable<ProductDto[]> {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ProductDto> {
        return this.productService.getOneProduct(+id);
    }

    @Post()
    create(@Body()  createProductDto : CreateProductDto){
        const productCreated = this.productService.createProduct(createProductDto);
        return productCreated;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto ) {
        const productUpdated = this.productService.updateProduct({ id:+id, ...updateProductDto });
        return productUpdated;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.deleteProduct(+id);
    }
    
    @Post(':id/characteristic')
    addCharacteristicToProduct(@Param('id') id: string, @Body() addCharacteristicToProductDto: AddCharacteristicToProductDto){
        return this.productService.addCharacteristicToProduct(+id,addCharacteristicToProductDto.characteristicIds);
    }

    @Delete(':id/characteristic')
    removeCharacteristicToProduct(@Param('id') id: string, @Body() addCharacteristicToProductDto: RemoveCharacteristicFromProductDto){
        return this.productService.removeCharacteristicToProduct(+id,addCharacteristicToProductDto.characteristicProductIds);
    }
}
