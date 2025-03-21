import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username)
        if (user && (await bcrypt.compare(pass, user.passwd))) {
            const { passwd, ...result} = user
            return result
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
