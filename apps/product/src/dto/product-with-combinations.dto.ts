import { CharacteristicProduct } from '../entities/characteristic-product.entity';
import { Product } from '../entities/product.entity';
import { CharacteristicDto } from './characteristic.dto';

export class ProductWithCombinationsDto extends Product {

  characteristics: CharacteristicProduct[];
  combinations: string[];
}