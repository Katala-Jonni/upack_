import { Equals, IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  readonly subject: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  readonly message: string;
  @IsNotEmpty()
  @IsBoolean()
  @Equals(true)
  readonly agreement: boolean;
}
