import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CharacteristicDto } from '../dto/characteristic.dto';

@Injectable()
export class CharacteristicService {

    constructor(
        @Inject('CHARACTERISTIC_SERVICE') private characteristicMicroservice : ClientProxy
    ){}

    getCharacteristicsByIds(ids: number[]): Observable<CharacteristicDto[]> {
        return this.characteristicMicroservice.send('get_characteristics_by_ids', { ids });
    }
}
