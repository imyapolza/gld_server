import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Arches {
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
