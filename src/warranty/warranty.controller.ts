import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { AppResponse } from 'src/response.base';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/model/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import * as bcrypt from 'bcrypt';

@Controller('warranty')
export class WarrantyController {
    constructor(private readonly warrantyService: WarrantyService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() res, @Body() createWarrantyDto: CreateWarrantyDto) {
        try {
            let data = await this.warrantyService.create(createWarrantyDto)
            return AppResponse.ok(res, data, "Success warranty product!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
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
    async setApprove(@Res() res, @Param('id') id: string, @Body() updateWarrantyDto: UpdateWarrantyDto) {
        try {
            updateWarrantyDto.status = updateWarrantyDto.status.toString();
            let data = await this.warrantyService.update(id, updateWarrantyDto);
            return AppResponse.ok(res, data, "Status changed!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

}
