import { IsNotEmpty } from 'class-validator';

export class UpdatePriceArchesDto {
  @IsNotEmpty()
  price: number;
}
