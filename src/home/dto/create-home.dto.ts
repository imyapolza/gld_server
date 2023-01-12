import { IsNotEmpty } from 'class-validator';

export class CreateHomeDto {
  id: 1;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  number: string;
}
