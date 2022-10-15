import {IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsers {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'rasa'})
    username: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'rasa'})
    password: string;
}