import { Controller, Body, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from 'apps/pervolare/src/dto/auth/register-user.dto';
import { AuthService } from '../../auth.service';
import { LocalAuthGuard } from '../../local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @UseGuards  (LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() registerUserDto : RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }
}
