import { IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateOrderStageDto {
  // @IsNotEmpty()
  // @IsString()
  // @IsMongoId()
  // readonly stage: string;
  @IsOptional()
  @IsString()
  @MinLength(4)
  readonly causeRejected?: string;
}
