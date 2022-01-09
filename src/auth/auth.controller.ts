import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
