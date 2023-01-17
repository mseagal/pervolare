import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';
import { Characteristic } from './entities/characteristic.entity';

@Controller('characteristic')
export class CharacteristicController {

  constructor(private readonly characteristicService : CharacteristicService){}

  @Get()
  findAll(): Promise<Characteristic[]> {
    return this.characteristicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Characteristic> {
    return this.characteristicService.findOne(+id);
  }

  @Post()
  create(@Body()  createCharacteristicDto : CreateCharacteristicDto){
    return "paso";
    const characteristicCreated = this.characteristicService.create(createCharacteristicDto);
    return characteristicCreated;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCharacteristicDto: UpdateCharacteristicDto) {
    const characteristicUpdated = await this.characteristicService.update(+id,updateCharacteristicDto);
    return characteristicUpdated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characteristicService.remove(+id);
  }
}
