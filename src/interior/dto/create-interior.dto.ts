import { IsNotEmpty } from 'class-validator';

interface Characterisctic {
  name: string;
  value: string;
}

export class CreateInteriorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  // @IsNumber()
  price: number;

  picturePath: string;

  @IsNotEmpty()
  characteristics: Array<Characterisctic>;
}
