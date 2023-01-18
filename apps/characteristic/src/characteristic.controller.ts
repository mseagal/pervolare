import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices/decorators';
import { CharacteristicService } from './characteristic.service';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';
import { Characteristic } from './entities/characteristic.entity';

@Controller('characteristic')
export class CharacteristicController {

  constructor(private readonly characteristicService : CharacteristicService){}

  @MessagePattern('get_all_characteristics')
  handleGetAllCharacteristics(): Promise<Characteristic[]> {
    return this.characteristicService.findAll();
  }

  @MessagePattern('get_one_characteristics')
  findOne(@Payload('id') id: string): Promise<Characteristic> {
    return this.characteristicService.findOne(+id);
  }

  @MessagePattern('create_characteristic')
  create(@Payload() createCharacteristicDto : CreateCharacteristicDto){
    const characteristicCreated = this.characteristicService.create(createCharacteristicDto);
    return characteristicCreated;
  }

  @MessagePattern('update_characteristic')
  async update(@Payload() updateCharacteristicDto: UpdateCharacteristicDto) {
    const characteristicUpdated = await this.characteristicService.update(updateCharacteristicDto);
    return characteristicUpdated;
  }

  @MessagePattern('delete_characteristic')
  remove(@Payload('id') id: string) {
    return this.characteristicService.remove(+id);
  }
}
