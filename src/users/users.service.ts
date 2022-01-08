import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/interfaces';
import { LoginUserDto } from './dto/login-user.dto';
import { WrongPassword } from 'src/core/exceptions/wrong-password';
import { CreateUserDto } from './dto/create-user.dto';
import { Exists } from 'src/core/exceptions/exists';
import { NotFound } from 'src/core/exceptions/not-found';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      username,
    });
    if (!user) throw new NotFound(username);
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    const exist = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (exist) throw new Exists(createUserDto.username);
    const newUser = new this.userModel({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
    return newUser.save();
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
    });
    if (!user) throw new NotFound(user.username);
    const isValid = await this.comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isValid) throw new WrongPassword(user.username);
    return user;
  }
}
