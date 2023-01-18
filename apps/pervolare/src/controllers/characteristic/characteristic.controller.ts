import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CharacteristicDto } from '../../dto/characteristic/characteristic.dto';
import { CharacteristicService } from '../../services/characteristic/characteristic.service';
import { CreateCharacteristicDto } from  "../../dto/characteristic/create-characteristic.dto";
import { UpdateCharacteristicDto } from '../../dto/characteristic/update-characteristic.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('characteristic')
export class CharacteristicController {

    constructor(private readonly characteristicService : CharacteristicService){}

    @UseGuards(JwtAuthGuard)
    @Get('')
    findAll(): Observable<CharacteristicDto[]> {
        return this.characteristicService.getAllCharacteristics();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Observable<CharacteristicDto> {
        return this.characteristicService.getOneCharacteristic(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('byIds')
    findByIds(@Body('ids') ids: number[] = []): Observable<CharacteristicDto> {
        return this.characteristicService.getCharacteristicsByIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()  createCharacteristicDto : CreateCharacteristicDto){
        const characteristicCreated = this.characteristicService.createCharacteristc(createCharacteristicDto);
        return characteristicCreated;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCharacteristicDto: UpdateCharacteristicDto) {
        const characteristicUpdated = this.characteristicService.updateCharacteristc({id:+id, ...updateCharacteristicDto});
        return characteristicUpdated;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.characteristicService.deleteCharacteristc(+id);
    }
}
