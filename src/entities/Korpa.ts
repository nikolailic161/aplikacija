import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Korisnik } from "./Korisnik";
import { KorpaStavka } from "./KorpaStavka";
import { Narudzbenica } from "./Narudzbenica";

@Index("fk_korpa_korisnik_id", ["korisnikId"], {})
@Entity("korpa", { schema: "auto_delovi" })
export class Korpa {
  @PrimaryGeneratedColumn({ type: "int", name: "korpa_id", unsigned: true })
  korpaId: number;

  @Column("int", { name: "korisnik_id", unsigned: true, default: () => "'0'" })
  korisnikId: number;

  @Column("timestamp", {
    name: "vreme_kreiranja",
    default: () => "CURRENT_TIMESTAMP",
  })
  vremeKreiranja: Date;

  @ManyToOne(() => Korisnik, (korisnik) => korisnik.korpas, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "korisnik_id", referencedColumnName: "korisnikId" }])
  korisnik: Korisnik;

  @OneToMany(
    () => KorpaStavka,
     korpaStavka => korpaStavka.korpa)
  korpaStavkas: KorpaStavka[];

  @OneToOne(() => Narudzbenica, (narudzbenica) => narudzbenica.korpa)
  narudzbenica: Narudzbenica;
}
