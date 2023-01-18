import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {

    async hashPassword(password:string){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async comparePassword(passwordPlain:string,passwordHash){
        const isMatch = await bcrypt.compare(passwordPlain, passwordHash);
        return isMatch;
    }
}
