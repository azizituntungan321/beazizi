import { Controller, Get, Post, Body, Param, Res, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { AppResponse } from 'src/response.base';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/model/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUsers } from 'src/model/create-users.class';
import { UpdateUsers } from 'src/model/update-users.class';
import { ActiveUsers } from 'src/model/active-users.class';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiTags('Users')
    @ApiResponse({
        status: 200,
        description: 'Success create user!',
    })
    @ApiResponse({
        status: 400,
        description: 'User already exists'
    })
    async create(@Res() res, @Body() createUsers:CreateUsers, @Body()createUsersDto: CreateUsersDto) {
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
    @ApiTags('Users')
    @ApiResponse({
        status: 200,
        description: 'Success create admin!',
    })
    @ApiResponse({
        status: 400,
        description: 'User already exists'
    })
    async createAdmin(@Res() res, @Body() createUsers:UpdateUsers, @Body() createUsersDto: CreateUsersDto) {
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
    @ApiTags('Users')
    @ApiResponse({
        status: 200,
        description: 'Success get users!',
    })
    @ApiResponse({
        status: 400,
        description: 'error message'
    })
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
    @ApiTags('Users')
    @ApiResponse({
        status: 200,
        description: 'Success get account!',
    })
    @ApiResponse({
        status: 400,
        description: 'error message'
    })
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
    @ApiTags('Users')
    @ApiResponse({
        status: 200,
        description: 'Password has been updated!',
    })
    @ApiResponse({
        status: 400,
        description: 'erros message'
    })
    async update(@Res() res, @Body() updateUsers:UpdateUsers, @Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
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
    @ApiTags('Users')
    @ApiResponse({
        status: 200,
        description: 'Status changed!',
    })
    @ApiResponse({
        status: 400,
        description: 'erros message'
    })
    async setApprove(@Res() res, @Body() activeUsers:ActiveUsers, @Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
        try {
            updateUsersDto.active = updateUsersDto.active.toString();
            let data = await this.usersService.update(id, updateUsersDto);
            return AppResponse.ok(res, data, "Status changed!")
        } catch (e) {
            return AppResponse.badRequest(res, "", e.message)
        }
    }

}