import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fitting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column('jsonb', { nullable: true })
  characteristics: object[];

  @Column()
  picturePath: string;
}
