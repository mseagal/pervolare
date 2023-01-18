import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { AddCharacteristicToProductDto } from "./add-characteristic-to-product.dto";

export class RemoveCharacteristicFromProductDto{

    @IsNotEmpty()
    productId: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({},{each:true})
    characteristicProductIds: number[];
}