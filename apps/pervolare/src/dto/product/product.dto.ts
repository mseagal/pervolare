import { IsNumber, IsNotEmpty, MinLength, MaxLength, IsAlphanumeric, Min } from "class-validator";

export class ProductDto{
    id: number;
    name: string;
    value: number;
    description: string;
    createdDate: Date
    updatedDate: Date
    deletedDate: Date
}


