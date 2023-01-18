import { ArrayNotEmpty, IsArray, IsNumber } from "class-validator";
import { AddCharacteristicToProductDto } from "./add-characteristic-to-product.dto";

export class RemoveCharacteristicFromProductDto{

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({},{each:true})
    characteristicProductIds: number[];
}