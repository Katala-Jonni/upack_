import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly stageId: string;
}
