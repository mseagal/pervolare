import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';
import { Characteristic } from './entities/characteristic.entity';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectRepository(Characteristic)
    private characteristicRepository: Repository<Characteristic>
  ) {
  }

  findAll(): Promise<Characteristic[]> {
      return this.characteristicRepository.find();
  }

  async findOne(id: number): Promise<Characteristic> {
      return this.characteristicRepository.findOneBy({ id });
  }

  create(createCharacteristicDto: CreateCharacteristicDto) {
      const characteristicTypeCreated = this.characteristicRepository.create(createCharacteristicDto);
      this.characteristicRepository.save(characteristicTypeCreated);
      return characteristicTypeCreated;
  }

  async update(characteristicTypeId: number,updateCharacteristicDto: UpdateCharacteristicDto) : Promise<Characteristic> {
      await this.characteristicRepository.update(characteristicTypeId,updateCharacteristicDto);
      return this.findOne(characteristicTypeId);
  }

  async remove(characteristicTypeId: number): Promise<UpdateResult> {
      return await this.characteristicRepository.softDelete(characteristicTypeId);
  }
}
