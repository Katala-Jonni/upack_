import {
  ArrayContains,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean, IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty, IsOptional,
  IsPositive,
  IsString,
  Min, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductParam {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  productId: string;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  count: number;
}

export class CreateBasketDto {
  // @IsNotEmpty()
  // @IsArray()
  // @ArrayNotEmpty()
  // @ArrayMinSize(1)
  // @ValidateNested({ each: true })
  // @Type(() => ProductParam)
  // readonly products: ProductParam[];
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  productId: string;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  count: number;
  // @IsNotEmpty()
  // @IsInt()
  // @IsPositive()
  // @Min(0)
  // readonly total: number;
  @IsOptional()
  @IsString()
  readonly localBasketId?: string;
  // @IsNotEmpty()
  // @IsInt()
  // @IsPositive()
  // @Min(0)
  // readonly discount?: number;
  // @IsNotEmpty()
  // @IsBoolean()
  // readonly delivery: boolean;
  // @IsNotEmpty()
  // @IsString()
  // @IsMongoId()
  // readonly userId?: string;
  // @IsNotEmpty()
  // @IsString()
  // @IsMongoId()
  // readonly couponId?: string;
}
