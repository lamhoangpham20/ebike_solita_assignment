import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Station } from "./Station";

@Entity()
export class Journey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departure_date: Date;

  @Column()
  return_date: Date;

  @Column("decimal")
  cover_distance: number;

  @OneToOne(() => Station)
  @JoinColumn()
  departure_station: Station;

  @OneToOne(() => Station)
  @JoinColumn()
  return_station: Station;

  @Column()
  duration: number;
}
