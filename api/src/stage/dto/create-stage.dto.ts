import { IsBoolean, IsHexColor, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsIncludes } from '@app/stage/decorators/isIncluses.decorator';

export class CreateStageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @IsIncludes('title')
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  readonly color: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;
}
