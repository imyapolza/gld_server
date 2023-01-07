interface Characterisctic {
  name: string;
  value: string;
}

export class CreateInteriorDto {
  name: string;
  characterisctics: Array<Characterisctic>;
  image: Blob;
}
