import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { AppResponse } from 'src/response.base';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post()
    async create(@Res() res, @Body() createUsersDto: CreateUsersDto) {
        try {
            let data = await this.usersService.create(createUsersDto)
            return AppResponse.ok(res, data, "Success create todo!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res) {
        try {
            let data = await this.usersService.findAll();
            return AppResponse.ok(res, data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id: string) {
        try {
            let data = await this.usersService.findOne(id);
            if(!data){
                return AppResponse.notFound(res,"")
            }
            return AppResponse.ok(res, data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @Put(':id')
    async update(@Res() res, @Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
        try {
            let data = await this.usersService.update(id, updateUsersDto);
            return AppResponse.ok(res, data, "Todo has been updated!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @Delete(':id')
    async remove(@Res() res, @Param('id') id: string) {
        try {
            let data = await this.usersService.remove(id);
            return AppResponse.ok(res, "", data)
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }
}