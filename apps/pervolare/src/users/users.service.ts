import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/auth/register-user.dto';
import { CryptService } from '../services/crypt/crypt.service';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cryptService : CryptService
  ) {
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({username});
  }

  async create(registerUserDto:RegisterUserDto){
    const userCreated = this.userRepository.create(registerUserDto);
    userCreated.password = await this.cryptService.hashPassword(userCreated.password);
    this.userRepository.save(userCreated);
    const { password , ...user } = userCreated;
    return user;
  }
}