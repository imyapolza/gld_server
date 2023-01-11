import { PartialType } from '@nestjs/mapped-types';
import { CreateEntranceDto } from './create-entrance.dto';

export class UpdateEntranceDto extends PartialType(CreateEntranceDto) {
  name: string;

  // @IsNumber()
  price: number;

  picturePath: string;

  characteristics: Array<Characterisctic>;
}
