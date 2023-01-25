import { IsNotEmpty } from 'class-validator';

export class CreateInteriorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  // @IsNumber()
  price: number;

  picturePath: string;

  query: { page: string; limit: string };

  @IsNotEmpty()
  characteristics: Array<Characterisctic>;
}
