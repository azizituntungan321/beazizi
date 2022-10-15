import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto.';
import { UpdateProductDto } from './dto/update-product.dto';
import { AppResponse } from 'src/response.base';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/model/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { CrudClass } from 'src/model/crud.class';
import { ProductClass } from 'src/model/product.class';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('product')

export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({
        status: 200,
        description: 'Success create product!',
    })
    @ApiResponse({
        status: 400,
        description: 'Error Message'
    })
    @ApiTags('Product')
    @Post()
    async create(@Res() res,  @Body() productClass:ProductClass, @Body() createProductDto: CreateProductDto) {
        try {
            let data = await this.productService.create(createProductDto)
            return AppResponse.ok(res, data, "Success create product!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({
        status: 200,
        description: 'Success get product!',
    })
    @ApiResponse({
        status: 400,
        description: 'Error Message'
    })
    @ApiTags('Product')
    async findAll(@Res() res) {
        try {
            let data = await this.productService.findAll();
            return AppResponse.ok(res, data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Success find product!',
    })
    @ApiResponse({
        status: 404,
        description: 'Data not found'
    })
    @ApiTags('Product')
    async findOne(@Res() res, @Body() crudClass:CrudClass, @Param('id') id: string) {
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

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Success update product!',
    })
    @ApiResponse({
        status: 400,
        description: 'Error Message'
    })
    @ApiTags('Product')
    async update(@Res() res, @Body() crudClass:CrudClass, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        try {
            let data = await this.productService.update(id, updateProductDto);
            return AppResponse.ok(res, data, "Product has been updated!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Success delete product!',
    })
    @ApiResponse({
        status: 400,
        description: 'Error Message'
    })
    @ApiTags('Product')
    async remove(@Res() res, @Body() crudClass:CrudClass, @Param('id') id: string) {
        try {
            let data = await this.productService.remove(id);
            return AppResponse.ok(res, "", data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }
}