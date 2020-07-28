import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artikl } from "./Artikl";
import { Korpa } from "./Korpa";

@Index("fk_korpa_stavka_artikl", ["artikl"], {})
@Index("artikl_korpa", ["artikl", "korpa"], { unique: true })
@Index("fk_korpa_stavka_korpa", ["korpa"], {})
@Entity("korpa_stavka", { schema: "auto_delovi" })
export class KorpaStavka {
  @PrimaryGeneratedColumn({ type: "int", name: "stavka_id", unsigned: true })
  stavkaId: number;

  @Column("int", { name: "kolicina", unsigned: true, default: () => "'1'" })
  kolicina: number;

  @ManyToOne(() => Artikl, (artikl) => artikl.korpaStavkas, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "artikl", referencedColumnName: "artiklId" }])
  artikl: Artikl;

  @ManyToOne(() => Korpa, (korpa) => korpa.korpaStavkas, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "korpa", referencedColumnName: "korpaId" }])
  korpa: Korpa;
}
