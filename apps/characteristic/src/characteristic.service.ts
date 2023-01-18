import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
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

  async findByIds(ids: number[]): Promise<Characteristic[]>{
    return await this.characteristicRepository.find({where: {id: In(ids) }});
  }

  create(createCharacteristicDto: CreateCharacteristicDto) {
      const characteristicTypeCreated = this.characteristicRepository.create(createCharacteristicDto);
      this.characteristicRepository.save(characteristicTypeCreated);
      return characteristicTypeCreated;
  }

  async update(updateCharacteristicDto: UpdateCharacteristicDto) : Promise<Characteristic> {
      await this.characteristicRepository.update(updateCharacteristicDto.id,updateCharacteristicDto);
      return this.findOne(updateCharacteristicDto.id);
  }

  async remove(characteristicTypeId: number): Promise<UpdateResult> {
      return await this.characteristicRepository.softDelete(characteristicTypeId);
  }
}
