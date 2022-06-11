import { CreateUserDto } from '@app/user/dto/createUser.dto';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsOptional,
} from 'class-validator';
import { IsIncludes } from '@app/user/decorators/isIncluses.decorator';

export class CreateUserWithAdminDto extends CreateUserDto {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIncludes('roles')
  readonly roles?: string[];
}
