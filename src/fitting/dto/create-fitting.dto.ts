import { IsNotEmpty } from "class-validator";

export class CreateFittingDto {
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
