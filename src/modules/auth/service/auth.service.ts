import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { Role } from '../../../utils/enum/role.enum';
import { JwtToken } from '../../../utils/enum/auth.enum';
// import { User } from '../../../modules/user/entity/user.entity';
// import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  // async validateUser(username: string, password: string){
  //   const user = await this.userService.findByUsername(username);
  //   if (user && (await this.comparePassword(password, user.password))) {
  //     return user;
  //   } else {
  //     throw new UnauthorizedException(
  //       'Login error: The email or password you have entered is incorrect. Please verify your information and try again',
  //     );
  //   }
  // }
}
