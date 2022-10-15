import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto.';
import { UpdateProductDto } from './dto/update-product.dto';
import { AppResponse } from 'src/response.base';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')

export class ProductController {
    constructor(private readonly productService: ProductService) { }
    @Post()
    async create(@Res() res, @Body() createProductDto: CreateProductDto) {
        try {
            let data = await this.productService.create(createProductDto)
            return AppResponse.ok(res, data, "Success create product!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res) {
        try {
            let data = await this.productService.findAll();
            return AppResponse.ok(res, data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id: string) {
        try {
            let data = await this.productService.findOne(id);
            if(!data){
                return AppResponse.notFound(res,"")
            }
            return AppResponse.ok(res, data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @Put(':id')
    async update(@Res() res, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        try {
            let data = await this.productService.update(id, updateProductDto);
            return AppResponse.ok(res, data, "Product has been updated!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @Delete(':id')
    async remove(@Res() res, @Param('id') id: string) {
        try {
            let data = await this.productService.remove(id);
            return AppResponse.ok(res, "", data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }
}