import { IsOptional } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends CreateProductDto{

    @IsOptional()
    id?: number;

}