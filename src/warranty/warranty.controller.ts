import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { AppResponse } from 'src/response.base';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/model/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { ActiveUsers } from 'src/model/active-users.class';
import { CreateWarranty } from 'src/model/warranty.class';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import * as bcrypt from 'bcrypt';

@Controller('warranty')
export class WarrantyController {
    constructor(private readonly warrantyService: WarrantyService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({
        status: 200,
        description: 'Success add warranty product!',
    })
    @ApiResponse({
        status: 400,
        description: 'Error Message'
    })
    @ApiTags('Warranty')
    async create(@Res() res,@Body() createWarranty:CreateWarranty, @Body() createWarrantyDto: CreateWarrantyDto) {
        try {
            let data = await this.warrantyService.create(createWarrantyDto)
            return AppResponse.ok(res, data, "Success add warranty product!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @ApiResponse({
        status: 200,
        description: 'Success get data warranty!',
    })
    @ApiResponse({
        status: 400,
        description: 'Error Message'
    })
    @ApiTags('Warranty')
    async findAll(@Res() res) {
        try {
            let data = await this.warrantyService.findAll();
            return AppResponse.ok(res, data, 'Success get data warranty!')
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/approve/:id')
    @ApiResponse({
        status: 200,
        description: 'Status changed!',
    })
    @ApiResponse({
        status: 400,
        description: 'Error Message'
    })
    @ApiTags('Warranty')
    async setApprove(@Res() res,@Body() activeUsers:ActiveUsers, @Param('id') id: string, @Body() updateWarrantyDto: UpdateWarrantyDto) {
        try {
            updateWarrantyDto.status = updateWarrantyDto.status.toString();
            let data = await this.warrantyService.update(id, updateWarrantyDto);
            return AppResponse.ok(res, data, "Status changed!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

}
