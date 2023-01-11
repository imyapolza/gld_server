import { IsNotEmpty } from 'class-validator';

export class UpdatePriceEntranceDto {
  @IsNotEmpty()
  price: number;
}
