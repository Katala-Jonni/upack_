import {
  ArrayNotEmpty,
  ArrayUnique,
  IsAlpha,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEqualTo } from '@app/user/decorators/isEqualTo.decorator';
import { IsIncludes } from '@app/user/decorators/isIncluses.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsOptional()
  @IsString()
  @MinLength(6)
  @IsMobilePhone('ru-RU')
  readonly phone?: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsAlpha()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsAlpha()
  readonly surname: string;
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsAlpha()
  readonly secondName?: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Пароль должен содержать минимум 1 цифру, 1 заглавную букву, быть больше 8 симловов',
  })
  password: string;
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIncludes('roles')
  readonly roles?: string[];
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsEqualTo('password')
  readonly passwordConfirm: string;
  @IsOptional()
  @IsString()
  readonly image?: string;
}
