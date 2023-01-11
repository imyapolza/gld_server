import { IsNotEmpty } from 'class-validator';

export class UpdatePriceInteriorDto {
  @IsNotEmpty()
  price: number;
}
