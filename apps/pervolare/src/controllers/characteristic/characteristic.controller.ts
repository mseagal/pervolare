import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Characteristic } from '../../dto/characteristic/characteristic.dto';
import { CharacteristicService } from '../../services/characteristic/characteristic.service';
import { CreateCharacteristicDto } from  "../../dto/characteristic/create-characteristic.dto";
import { UpdateCharacteristicDto } from '../../dto/characteristic/update-characteristic.dto';

@Controller('characteristic')
export class CharacteristicController {

    constructor(private readonly characteristicService : CharacteristicService){}

    @Get('')
    findAll(): Observable<Characteristic[]> {
        return this.characteristicService.getAllCharacteristics();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<Characteristic> {
        return this.characteristicService.getOneCharacteristic(+id);
    }

    @Post()
    create(@Body()  createCharacteristicDto : CreateCharacteristicDto){
        const characteristicCreated = this.characteristicService.createCharacteristc(createCharacteristicDto);
        return characteristicCreated;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCharacteristicDto: UpdateCharacteristicDto) {
        const characteristicUpdated = this.characteristicService.updateCharacteristc({id:+id, ...updateCharacteristicDto});
        return characteristicUpdated;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.characteristicService.deleteCharacteristc(+id);
    }
}
