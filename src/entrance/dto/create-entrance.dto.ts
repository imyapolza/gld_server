import { IsNotEmpty } from "class-validator";

export class CreateEntranceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  // @IsNumber()
  price: number;

  picturePath: string;

  @IsNotEmpty()
  characteristics: Array<Characterisctic>;
}
