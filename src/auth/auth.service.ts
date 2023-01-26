import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByCond({ email });

    const isPasswordMatching = await bcrypt.compareSync(password, user.password);

    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new HttpException(
        'Неверная почта или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };

    return this.jwtService.sign(payload);
  }

  setAccessToken(user: UserEntity, res: Response) {
    res.cookie('accessToken', this.generateJwtToken(user), {
      expires: new Date(new Date().getTime() + 720 * 60 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
  }

  async login(user: UserEntity, res: Response) {
    try {
      const { password, ...userData } = user;

      this.setAccessToken(userData, res);

      return res.send(user);
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
