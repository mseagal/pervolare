import { CharacteristicType } from "../../enums/characteristic-type.enum";

export class Characteristic {

  id: number;
  name: string;
  type: CharacteristicType;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}