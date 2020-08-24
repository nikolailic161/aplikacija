import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Korpa } from "./Korpa";
import * as Validator from 'class-validator';

@Index("email", ["email"], { unique: true })
@Index("username", ["username"], { unique: true })
@Entity("korisnik", { schema: "auto_delovi" })
export class Korisnik {
  @PrimaryGeneratedColumn({ type: "int", name: "korisnik_id", unsigned: true })
  korisnikId: number;

  @Column("varchar", { name: "username", unique: true, length: 30 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  username: string;

  @Column("varchar", { name: "password", length: 128, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')

  password: string;

  @Column("varchar", { name: "ime", length: 30, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,30)
  ime: string;

  @Column("varchar", { name: "prezime", length: 40, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,40)
  prezime: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 40,
    default: () => "'0'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain:false,
    allow_utf8_local_part:true,
    require_tld:true

  })
  email: string;

  @Column("varchar", { name: "adresa", length: 50, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,50)
  adresa: string;

  @OneToMany(() => Korpa, (korpa) => korpa.korisnik)
  korpas: Korpa[];
}
