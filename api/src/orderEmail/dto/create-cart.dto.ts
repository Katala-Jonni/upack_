import {
    IsInt,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateCartDto {
    @IsInt()
    @IsNotEmpty()
    readonly count: number;
    @IsNotEmpty()
    readonly price: number;
    @IsInt()
    @IsNotEmpty()
    readonly qty: number;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly imgUrl: string;
    @IsNotEmpty()
    @IsString()
    readonly id: string;
}
