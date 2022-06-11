import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { IsEqualTo } from '@app/user/decorators/isEqualTo.decorator';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Пароль должен содержать минимум 1 цифру, 1 заглавную букву, быть больше 8 симловов',
  })
  password: string;
  @IsOptional()
  @IsString()
  @MinLength(8)
  @IsEqualTo('password')
  readonly passwordConfirm: string;
}
