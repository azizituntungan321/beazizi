import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ProductTransformer } from './transformers/product.transformer';
@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private ProductModel: Model<Product>) { }
    async create(CreateProductDto: CreateProductDto): Promise<ProductTransformer> {
        let data = new this.ProductModel(CreateProductDto)
        return ProductTransformer.singleTransform(await data.save())
    }

    async findAll(): Promise<ProductTransformer> {
        let data = await this.ProductModel.find()
        if (data.length < 1) {
            return []
        }
        return ProductTransformer.transform(data)
    }

    async findOne(id: string): Promise<ProductTransformer> {
        let data = await this.ProductModel.findById(id)
        if (!data) {
            return null;
        }
        return ProductTransformer.singleTransform(data)
    }

    async update(id: string, UpdateProductDto: UpdateProductDto): Promise<ProductTransformer> {
        let data = await this.ProductModel.findByIdAndUpdate(id, UpdateProductDto, { 'new': true })
        if (!data) {
            return null;
        }
        return ProductTransformer.singleTransform(data)
    }

    async remove(id: string): Promise<String> {
        let data = await this.ProductModel.findByIdAndRemove(id)
        if (!data) {
            return null;
        }
        return id
    }
}