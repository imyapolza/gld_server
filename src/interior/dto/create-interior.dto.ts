import { IsNotEmpty } from 'class-validator';

export class CreateInteriorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  // @IsNumber()
  price: number;

  picturePath: string;

  query: ParameterDecorator;

  @IsNotEmpty()
  characteristics: Array<Characterisctic>;
}
