import { IsNotEmpty } from "class-validator";

export class CreateArchesDto {
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
