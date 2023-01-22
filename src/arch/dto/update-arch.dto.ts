import { PartialType } from '@nestjs/mapped-types';
import { CreateArchesDto } from './create-arch.dto';

export class UpdateArchesDto extends PartialType(CreateArchesDto) {
  name: string;

  // @IsNumber()
  price: number;

  picturePath: string;

  characteristics: Array<Characterisctic>;
}
