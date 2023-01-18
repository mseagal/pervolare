import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
