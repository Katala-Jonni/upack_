import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray, IsBoolean,
  IsDate,
  IsInt, IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min, MinDate,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsIncludes } from '@app/order/decorators/isIncluses.decorator';
import { IsGreater } from '@app/order/decorators/isgreato.decorator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly basketId: string;
  @IsOptional()
  @IsString()
  @IsMongoId()
  readonly client?: string;
  @IsOptional()
  @IsDate()
  @MinDate(new Date())
  readonly deliveryDate?: Date;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  readonly street: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  readonly house: string;
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  readonly building?: string;
  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly apartment: number;
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  readonly addressComment?: string;
  @IsOptional()
  @IsString()
  @IsMongoId()
  readonly coupon?: string;
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  readonly guestName?: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsMobilePhone('ru-RU')
  readonly phone: string;
  @IsNotEmpty()
  @IsString()
  @IsIncludes('payType')
  readonly payType: string;
  @IsNotEmpty()
  @IsInt()
  @IsGreater(['totalBasket', 'returnMoney', 'payType'])
  readonly amountMoney: number;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly totalBasket: number;
  @IsOptional()
  @IsBoolean()
  readonly returnMoney?: boolean;
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  readonly wishes?: string;
}
