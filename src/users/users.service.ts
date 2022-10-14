import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersTransformer } from './transformers/users.transformer';

export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
      },
  ]
  constructor(@InjectModel('Users') private UsersModel: Model<Users>) { }
  async create(CreateUsersDto: CreateUsersDto): Promise<UsersTransformer> {
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
      throw new Error("Users is not found!")
    }
    return UsersTransformer.singleTransform(data)
  }

  async remove(id: string): Promise<String> {
    let data = await this.UsersModel.findByIdAndRemove(id)
    if (!data) {
      throw new Error("Users is not found!")
    }
    return "Users has been deleted!"
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
