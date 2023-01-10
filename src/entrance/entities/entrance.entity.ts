import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entrance {
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
