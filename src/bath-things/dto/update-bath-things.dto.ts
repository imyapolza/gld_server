import { PartialType } from '@nestjs/mapped-types';
import { CreateBathThingsDto } from './create-bath-things.dto';

export class UpdateBathThingsDto extends PartialType(CreateBathThingsDto) {
  name: string;

  // @IsNumber()
  price: number;

  picturePath: string;

  characteristics: Array<Characterisctic>;
}
