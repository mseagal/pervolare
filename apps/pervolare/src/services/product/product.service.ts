import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from '../../dto/product/create-product.dto';
import { ProductDto } from '../../dto/product/product.dto';
import { UpdateProductDto } from '../../dto/product/update-product.dto';

@Injectable()
export class ProductService {

    constructor(
        @Inject('PRODUCT_SERVICE') private productMicroservice : ClientProxy
    ){}

    getAllProducts(): Observable<ProductDto[]>{
        return this.productMicroservice.send('get_all_products', {});
    }

    getOneProduct(id: number): Observable<ProductDto> {
        return this.productMicroservice.send('get_one_product', { id });
    }

    createProduct(createProductDto : CreateProductDto): Observable<ProductDto> {
        return this.productMicroservice.send('create_product',createProductDto);
    }

    updateProduct(updateProductDto : UpdateProductDto): Observable<ProductDto> {
        return this.productMicroservice.send('update_product',updateProductDto);
    }

    deleteProduct(id: number): Observable<UpdateResult> {
        return this.productMicroservice.send('delete_product', { id });
    }

    addCharacteristicToProduct(productId:number,characteristicIds : number[]): Observable<ProductDto> {
        return this.productMicroservice.send('add_characteristic_to_product',{ productId, characteristicIds });
    }

    removeCharacteristicToProduct(productId:number,characteristicProductIds : number[]): Observable<ProductDto> {
        return this.productMicroservice.send('remove_characteristic_to_product',{ productId, characteristicProductIds });
    }
}
