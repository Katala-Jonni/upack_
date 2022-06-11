import { CreateCategoryDto } from '@app/category/dto/createCategory.dto';
import { ArrayUnique, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsOptional()
  @IsBoolean()
  readonly active?: boolean;
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  readonly products?: []
}
