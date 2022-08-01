import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  OneToMany,
  Generated,
} from "typeorm";
import { Journey } from "./Journey";

@Entity()
export class Station extends BaseEntity {
  @Generated()
  fid!: number;

  @PrimaryColumn()
  id!: string;

  @Column({nullable:true})
  nimi: string;

  @Column({nullable:true})
  namn: string;

  @Column()
  name: string;

  @Column({nullable:true})
  oisoite: string;

  @Column({nullable:true})
  address: string;

  @Column({nullable:true})
  kaupunki: string;

  @Column({nullable:true})
  stad: string;

  @Column({nullable:true})
  operator: string;

  @Column({nullable:true})
  capacities: number;

  @Column("decimal", {nullable:true})
  longitude: number;

  @Column("decimal", {nullable:true})
  latitude: number;

  @OneToMany(() => Journey, (journey) => journey.departure_station)
  departurn_journeys: Journey[];

  @OneToMany(() => Journey, (journey) => journey.return_station)
  return_journeys: Journey[];
}
