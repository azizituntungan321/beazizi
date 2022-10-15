import {IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActiveUsers {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Y'})
    active: string;
}