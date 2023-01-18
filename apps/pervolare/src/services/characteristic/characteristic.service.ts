import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { CharacteristicDto } from '../../dto/characteristic/characteristic.dto';
import { CreateCharacteristicDto } from '../../dto/characteristic/create-characteristic.dto';
import { UpdateCharacteristicDto } from '../../dto/characteristic/update-characteristic.dto';

@Injectable()
export class CharacteristicService {

    constructor(
        @Inject('CHARACTERISTIC_SERVICE') private characteristicMicroservice : ClientProxy
    ){}

    getAllCharacteristics(): Observable<CharacteristicDto[]>{
        return this.characteristicMicroservice.send('get_all_characteristics', {});
    }

    getOneCharacteristic(id: number): Observable<CharacteristicDto> {
        return this.characteristicMicroservice.send('get_one_characteristics', { id });
    }

    createCharacteristc(createCharacteristicDto : CreateCharacteristicDto): Observable<CharacteristicDto> {
        return this.characteristicMicroservice.send('create_characteristic',createCharacteristicDto);
    }

    updateCharacteristc(updateCharacteristicDto : UpdateCharacteristicDto): Observable<CharacteristicDto> {
        return this.characteristicMicroservice.send('update_characteristic',updateCharacteristicDto);
    }

    deleteCharacteristc(id: number): Observable<UpdateResult> {
        return this.characteristicMicroservice.send('delete_characteristic', { id });
    }
}
