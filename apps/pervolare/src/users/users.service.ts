import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/auth/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({username});
  }

  async create(registerUserDto:RegisterUserDto){
    const userCreated = this.userRepository.create(registerUserDto)
    this.userRepository.save(userCreated);
    return userCreated;
  }
}