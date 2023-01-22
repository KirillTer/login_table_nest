import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@google.com', description: 'Email'})
    @IsString({message: 'Should be a string'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;
    @ApiProperty({example: '123', description: 'Password'})
    @IsString({message: 'Should be a string'})
    @Length(3, 8, {message: 'More than 3 and less than 8'})
    readonly password: string;
}