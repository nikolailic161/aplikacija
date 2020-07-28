import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Korpa } from "./Korpa";

@Index("email", ["email"], { unique: true })
@Index("username", ["username"], { unique: true })
@Entity("korisnik", { schema: "auto_delovi" })
export class Korisnik {
  @PrimaryGeneratedColumn({ type: "int", name: "korisnik_id", unsigned: true })
  korisnikId: number;

  @Column("varchar", { name: "username", unique: true, length: 30 })
  username: string;

  @Column("varchar", { name: "password", length: 128, default: () => "'0'" })
  password: string;

  @Column("varchar", { name: "ime", length: 30, default: () => "'0'" })
  ime: string;

  @Column("varchar", { name: "prezime", length: 40, default: () => "'0'" })
  prezime: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 40,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", { name: "adresa", length: 50, default: () => "'0'" })
  adresa: string;

  @OneToMany(() => Korpa, (korpa) => korpa.korisnik)
  korpas: Korpa[];
}
