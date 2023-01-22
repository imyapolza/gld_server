import { IsNotEmpty } from 'class-validator';

export class UpdatePriceFittingDto {
  @IsNotEmpty()
  price: number;
}
