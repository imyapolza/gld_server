import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: 1;

  @Column()
  address: string;

  @Column()
  number: string;
}
