import { IsNumber, IsNotEmpty, MinLength, MaxLength, IsAlphanumeric, Min } from "class-validator";

export class CreateProductDto{

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(10)
    @IsAlphanumeric()
    name: string;

    @IsNumber()
    @Min(1)
    value: number;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    description: string;

}