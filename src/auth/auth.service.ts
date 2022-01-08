import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.createNewUser(createUserDto);
    return {
      message: `User ${createUserDto.username} created successfully`,
      accessToken: this.jwtService.sign({
        username: user.username,
      }),
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.loginUser(loginUserDto);
    return {
      message: `User ${loginUserDto.username} logged in successfully`,
      accessToken: this.jwtService.sign({
        username: user.username,
        role: user.role,
      }),
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  async validateUserByJwt(payload: any) {
    const user = await this.usersService.findUserByUsername(payload.username);
    const accessToken = this.jwtService.sign({
      username: user.username,
      role: user.role,
    });
    return {
      token: accessToken,
    };
  }
}
