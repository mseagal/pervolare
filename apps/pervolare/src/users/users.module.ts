import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { CryptService } from '../services/crypt/crypt.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService,CryptService],
  exports: [UsersService]
})
export class UsersModule {}
