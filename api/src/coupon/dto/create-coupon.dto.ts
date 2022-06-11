import {
  IsDateString,
  IsNotEmpty,
  IsPositive,
  IsBoolean,
  MaxLength,
  MinLength,
  IsString,
  IsInt,
  Min,
} from 'class-validator';
import { IsIncludes } from '@app/coupon/decorators/isIncluses.decorator';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  readonly secret: string;
  @IsNotEmpty()
  @IsDateString({ strict: true })
  readonly expire: Date;
  @IsNotEmpty()
  @IsString()
  @IsIncludes('type')
  readonly type: string;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  readonly count: number;
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;
}
