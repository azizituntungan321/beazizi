import {IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsers {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: '123345'})
    password: string;
}