import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Korpa } from "./Korpa";
import * as Validator from 'class-validator';

@Index("korpa_id", ["korpaId"], { unique: true })
@Entity("narudzbenica", { schema: "auto_delovi" })
export class Narudzbenica {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "narudzbenica_id",
    unsigned: true,
  })
  narudzbenicaId: number;

  @Column("int", {
    name: "korpa_id",
    unique: true,
    unsigned: true,
    default: () => "'0'",
  })
  korpaId: number;

  @Column("timestamp", {
    name: "vreme_kreiranja",
    default: () => "CURRENT_TIMESTAMP",
  })
  vremeKreiranja: Date;

  @Column("enum", {
    name: "status",
    enum: ["odbijeno", "prihvaceno", "poslato", "na cekanju"],
    default: () => "'na cekanju'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsIn(["odbijeno", "prihvaceno", "poslato", "na cekanju"])
  status: "odbijeno" | "prihvaceno" | "poslato" | "na cekanju";

  @OneToOne(() => Korpa, (korpa) => korpa.narudzbenica, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "korpa_id", referencedColumnName: "korpaId" }])
  korpa: Korpa;
}
