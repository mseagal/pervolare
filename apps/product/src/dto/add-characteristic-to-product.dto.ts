import { IsNumber, IsArray, ArrayNotEmpty, IsOptional } from "class-validator";

export class AddCharacteristicToProductDto{

    @IsOptional()
    productId: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({},{each:true})
    characteristicIds: number[];
}