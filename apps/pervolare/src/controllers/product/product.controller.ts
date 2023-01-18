import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
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

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Observable<ProductDto[]> {
        return this.productService.getAllProducts();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Observable<ProductDto> {
        return this.productService.getOneProduct(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()  createProductDto : CreateProductDto){
        const productCreated = this.productService.createProduct(createProductDto);
        return productCreated;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto ) {
        const productUpdated = this.productService.updateProduct({ id:+id, ...updateProductDto });
        return productUpdated;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.deleteProduct(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/characteristic')
    addCharacteristicToProduct(@Param('id') id: string, @Body() addCharacteristicToProductDto: AddCharacteristicToProductDto){
        return this.productService.addCharacteristicToProduct(+id,addCharacteristicToProductDto.characteristicIds);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/characteristic')
    removeCharacteristicToProduct(@Param('id') id: string, @Body() addCharacteristicToProductDto: RemoveCharacteristicFromProductDto){
        return this.productService.removeCharacteristicToProduct(+id,addCharacteristicToProductDto.characteristicProductIds);
    }
}
