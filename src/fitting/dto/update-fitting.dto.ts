import { PartialType } from '@nestjs/mapped-types';
import { CreateFittingDto } from './create-fitting.dto';

export class UpdateFittingDto extends PartialType(CreateFittingDto) {
  name: string;

  // @IsNumber()
  price: number;

  picturePath: string;

  characteristics: Array<Characterisctic>;
}
