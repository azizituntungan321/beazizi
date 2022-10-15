import { Controller, Get, Post, Body, Param, Delete, Res, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { AppResponse } from 'src/response.base';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/model/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import * as bcrypt from 'bcrypt';

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Res() res, @Body() createUsersDto: CreateUsersDto) {
        try {
            let check = await this.usersService.findOne(createUsersDto.username.toString());
            if (check) {
                return AppResponse.badRequest(res,"","User already exists",)
            }
            let data = await this.usersService.create(createUsersDto)
            return AppResponse.ok(res, data, "Success create user!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/admin')
    async createAdmin(@Res() res, @Body() createUsersDto: CreateUsersDto) {
        try {
            let check = await this.usersService.findOne(createUsersDto.username.toString());
            if (check) {
                return AppResponse.badRequest(res,"","User already exists",)
            }
            let data = await this.usersService.createAdmin(createUsersDto)
            return AppResponse.ok(res, data, "Success create admin!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll(@Res() res) {
        try {
            let data = await this.usersService.findAll();
            return AppResponse.ok(res, data, 'Success get users!')
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/account/:id')
    async findUser(@Res() res, @Param('id') username: string) {
        try {
            let data = await this.usersService.findOne(username);
            return AppResponse.ok(res, data, 'Success get account!')
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/change-password/:id')
    async update(@Res() res, @Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
        try {
            const salt = await bcrypt.genSalt();
            const password = updateUsersDto.password.toString();
            updateUsersDto.password = await bcrypt.hash(password, salt);
            let data = await this.usersService.update(id, updateUsersDto);
            return AppResponse.ok(res, data, "Password has been updated!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/approve/:id')
    async setApprove(@Res() res, @Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
        try {
            updateUsersDto.active = updateUsersDto.active.toString();
            let data = await this.usersService.update(id, updateUsersDto);
            return AppResponse.ok(res, data, "Status changed!")
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