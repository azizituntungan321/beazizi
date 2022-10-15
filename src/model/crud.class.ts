import {IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrudClass {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: '12312321'})
    id: string;
}