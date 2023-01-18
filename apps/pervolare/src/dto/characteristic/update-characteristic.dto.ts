import { IsOptional } from "class-validator";
import { CreateCharacteristicDto } from "./create-characteristic.dto";

export class UpdateCharacteristicDto extends CreateCharacteristicDto{

    @IsOptional()
    id?:number;
}