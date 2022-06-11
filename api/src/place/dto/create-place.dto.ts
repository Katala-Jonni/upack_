import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  readonly address: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  readonly info: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsMobilePhone('ru-RU')
  readonly phone: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  readonly director: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(300)
  readonly description: string;
}
