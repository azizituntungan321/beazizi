import {IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWarranty {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: '12312321'})
    idProduct: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'rasa'})
    username: string;
}