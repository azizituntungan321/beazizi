import {IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductClass {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Indomilk'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Susu segar cap bendera'})
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'MINUMAN'})
    tag: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Y'})
    is_show: string;
}