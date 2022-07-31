import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, BaseEntity } from "typeorm";

@Entity()
export class Station extends BaseEntity {
  @PrimaryGeneratedColumn()
  fid!: number;

  @PrimaryColumn()
  id: string;

  @Column()
  nimi: string;

  @Column()
  namn: string;

  @Column()
  name: string;

  @Column()
  oisoite: string;

  @Column()
  address: string;

  @Column()
  kaupunki: string;

  @Column()
  stad: string;

  @Column()
  operator: string;

  @Column()
  capacities: number;

  @Column("decimal")
  longitude: number;

  @Column("decimal")
  latitude: number;
}

