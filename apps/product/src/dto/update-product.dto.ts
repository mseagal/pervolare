import { IsNumber, IsNotEmpty } from "class-validator";

export class UpdateProductDto{

    @IsNotEmpty()
    name: string;

    @IsNumber()
    value: number;

    @IsNotEmpty()
    description: string;

}