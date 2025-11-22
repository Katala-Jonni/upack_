import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray, IsBoolean,
  IsDate, IsEmail,
  IsInt, IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min, MinDate,
  MinLength,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsGreater } from "@app/orderEmail/decorators/isgreato.decorator";
import { IsIncludes } from "@app/orderEmail/decorators/isIncluses.decorator";
import { CreateCartDto } from "@app/orderEmail/dto/create-cart.dto";

export class CreateOrderDto {
  // @IsNotEmpty()
  // @IsDate()
  // readonly date: Date;
  @IsNotEmpty()
  @IsString()
  readonly time: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  readonly address: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly organization: string;
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(200)
  readonly comment?: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly surname: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsMobilePhone('ru-RU')
  readonly phone: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateCartDto)
  cart: CreateCartDto[];
}

// export class CreateOrderDto {
//   @IsNotEmpty()
//   @IsString()
//   @IsMongoId()
//   readonly basketId: string;
//   @IsOptional()
//   @IsString()
//   @IsMongoId()
//   readonly client?: string;
//   @IsOptional()
//   @IsDate()
//   @MinDate(new Date())
//   readonly deliveryDate?: Date;
//   @IsNotEmpty()
//   @IsString()
//   @MinLength(4)
//   @MaxLength(100)
//   readonly street: string;
//   @IsNotEmpty()
//   @IsString()
//   @MinLength(1)
//   @MaxLength(10)
//   readonly house: string;
//   @IsOptional()
//   @IsString()
//   @MinLength(1)
//   @MaxLength(10)
//   readonly building?: string;
//   @IsOptional()
//   @IsInt()
//   @IsPositive()
//   readonly apartment: number;
//   @IsOptional()
//   @IsString()
//   @MinLength(4)
//   @MaxLength(100)
//   readonly addressComment?: string;
//   @IsOptional()
//   @IsString()
//   @IsMongoId()
//   readonly coupon?: string;
//   @IsOptional()
//   @IsString()
//   @MinLength(4)
//   @MaxLength(30)
//   readonly guestName?: string;
//   @IsNotEmpty()
//   @IsString()
//   @MinLength(6)
//   @IsMobilePhone('ru-RU')
//   readonly phone: string;
//   @IsNotEmpty()
//   @IsString()
//   @IsIncludes('payType')
//   readonly payType: string;
//   @IsNotEmpty()
//   @IsInt()
//   @IsGreater(['totalBasket', 'returnMoney', 'payType'])
//   readonly amountMoney: number;
//   @IsNotEmpty()
//   @IsInt()
//   @IsPositive()
//   readonly totalBasket: number;
//   @IsOptional()
//   @IsBoolean()
//   readonly returnMoney?: boolean;
//   @IsOptional()
//   @IsString()
//   @MinLength(4)
//   @MaxLength(100)
//   readonly wishes?: string;
// }
