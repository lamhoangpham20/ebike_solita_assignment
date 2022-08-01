import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Station } from "./Station";

@Entity()
export class Journey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp with time zone" })
  departure_date: Date;

  @Column({ type: "timestamp with time zone" })
  return_date: Date;

  @Column("decimal")
  cover_distance: number;

  @ManyToOne(
    () => Station,
    (departure_station) => departure_station.departurn_journeys
  )
  @JoinColumn()
  departure_station: Station;

  @ManyToOne(() => Station, (return_station) => return_station.return_journeys)
  @JoinColumn()
  return_station: Station;

  @Column()
  departure_station_name: string;

  @Column()
  return_station_name: string;

  @Column()
  duration: number;
}
