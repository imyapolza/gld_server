import { PartialType } from '@nestjs/mapped-types';
import { CreateInteriorDto } from './create-interior.dto';

export class UpdateInteriorDto extends PartialType(CreateInteriorDto) {
  name: string;

  // @IsNumber()
  price: number;

  picturePath: string;

  characteristics: Array<Characterisctic>;
}
