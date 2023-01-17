import { IsNumber, IsArray, ArrayNotEmpty } from "class-validator";

export class AddCharacteristicToProductDto{

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({},{each:true})
    characteristicIds: number[];
}