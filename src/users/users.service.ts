import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersTransformer } from './transformers/users.transformer';
import * as bcrypt from 'bcrypt';

// export type User = any;
@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private UsersModel: Model<Users>) { }
  
  async create(CreateUsersDto: CreateUsersDto): Promise<UsersTransformer> {
    const salt = await bcrypt.genSalt();
    const password = CreateUsersDto.password.toString();
    CreateUsersDto.password = await bcrypt.hash(password, salt);
    CreateUsersDto.role = 'USER';
    CreateUsersDto.active = 'N';
    let data = new this.UsersModel(CreateUsersDto)
    return UsersTransformer.singleTransform(await data.save())
  }

  async createAdmin(CreateUsersDto: CreateUsersDto): Promise<UsersTransformer> {
    const salt = await bcrypt.genSalt();
    const password = CreateUsersDto.password.toString();
    CreateUsersDto.password = await bcrypt.hash(password, salt);
    CreateUsersDto.role = 'ADMIN';
    let data = new this.UsersModel(CreateUsersDto)
    return UsersTransformer.singleTransform(await data.save())
  }

  async findAll(): Promise<UsersTransformer> {
    let data = await this.UsersModel.find()
    if (data.length < 1) {
      return []
    }
    return UsersTransformer.transform(data)
  }

  async update(id: string, UpdateUsersDto: UpdateUsersDto): Promise<UsersTransformer> {
    let data = await this.UsersModel.findByIdAndUpdate(id, UpdateUsersDto, { 'new': true })
    if (!data) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    return UsersTransformer.singleTransform(data)
  }

  async remove(id: string): Promise<String> {
    let data = await this.UsersModel.findByIdAndRemove(id)
    if (!data) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User Not Found',
      }, HttpStatus.NOT_FOUND);
    }
    return "Users has been deleted!"
  }

  async findOne(username: string): Promise<any> {
    return this.UsersModel.findOne({username}).exec();
  }

}
