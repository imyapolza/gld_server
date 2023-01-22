import { IsNotEmpty } from 'class-validator';

export class UpdatePriceBathThingsDto {
  @IsNotEmpty()
  price: number;
}
