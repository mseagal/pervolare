import { IsNotEmpty, MinLength, MaxLength, IsAlphanumeric, IsEnum } from "class-validator";
import { CharacteristicType } from "../../enums/characteristic-type.enum";

export class CreateCharacteristicDto{

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(10)
    @IsAlphanumeric()
    name: string;

    @IsEnum(CharacteristicType)
    type: CharacteristicType;

}