import { Injectable } from '@nestjs/common';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { Warranty } from './interfaces/warranty.interface';
import { WarrantyTransformer } from './transformers/warranty.transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WarrantyService {
    constructor(@InjectModel('Warranty') private WarrantyModel: Model<Warranty>) { }

    async create(CreateWarrantyDto: CreateWarrantyDto): Promise<WarrantyTransformer> {
        CreateWarrantyDto.status = 'N';
        let data = new this.WarrantyModel(CreateWarrantyDto)
        return WarrantyTransformer.singleTransform(await data.save())
    }

    async findAll(): Promise<WarrantyTransformer> {
        let data = await this.WarrantyModel.find()
        if (data.length < 1) {
          return []
        }
        return WarrantyTransformer.transform(data)
    }

    async update(id: string, UpdateWarrantyDto: UpdateWarrantyDto): Promise<WarrantyTransformer> {
        let data = await this.WarrantyModel.findByIdAndUpdate(id, UpdateWarrantyDto, { 'new': true })
        if (!data) {
          throw new Error("Data is not found!")
        }
        return WarrantyTransformer.singleTransform(data)
    }
}
