import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class UpdateOrderProductDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  count: number;
}
