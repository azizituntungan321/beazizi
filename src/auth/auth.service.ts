import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppResponse } from 'src/response.base';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
      let data =  await this.usersService.findOne(username);
      if (!data) {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
        }, HttpStatus.NOT_FOUND);
      }

      // if (data.active == 'N') {
      //   throw new HttpException({
      //     statusCode: HttpStatus.UNAUTHORIZED,
      //     message: 'Waiting for approve',
      //   }, HttpStatus.UNAUTHORIZED);
      // }

      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        throw new HttpException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        }, HttpStatus.UNAUTHORIZED);
      }
      return data
    }

    async login(user: any) {
      const payload = { username: user.username, sub: user.userId, role: user.role };
      return {
        statusCode: HttpStatus.OK,
        message: 'Success create token',
        accessToken: this.jwtService.sign(payload),
      };
    }
}
