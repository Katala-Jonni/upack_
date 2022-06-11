import {
  ArrayNotEmpty, ArrayUnique,
  IsArray,
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty, IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  readonly title: string;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  readonly price: number;
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly categoryId: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  readonly composition: string;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  readonly weight: number;
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  readonly images?: string[];
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(300)
  readonly description: string;
}
