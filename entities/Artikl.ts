import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Automobil } from "./Automobil";
import { Kategorija } from "./Kategorija";
import { KorpaStavka } from "./KorpaStavka";

@Index("fk_artikl_kategorija", ["kategorija"], {})
@Entity("artikl", { schema: "auto_delovi" })
export class Artikl {
  @PrimaryGeneratedColumn({ type: "int", name: "artikl_id", unsigned: true })
  artiklId: number;

  @Column("varchar", { name: "naziv", length: 30 })
  naziv: string;

  @Column("varchar", {
    name: "slika",
    nullable: true,
    length: 50,
    default: () => "'0'",
  })
  slika: string | null;

  @Column("int", { name: "stanje", unsigned: true, default: () => "'1'" })
  stanje: number;

  @Column("varchar", {
    name: "opis",
    nullable: true,
    length: 200,
    default: () => "'0'",
  })
  opis: string | null;

  @Column("decimal", { name: "cena", precision: 10, scale: 0 })
  cena: string;

  @Column("varchar", { name: "fabricki", length: 3, default: () => "'Da'" })
  fabricki: string;

  @Column("int", { name: "garancija", nullable: true, default: () => "'0'" })
  garancija: number | null;

  @ManyToMany(() => Automobil, (automobil) => automobil.artikls)
  @JoinTable({
    name: "artikl_automobil",
    joinColumns: [{ name: "artikl", referencedColumnName: "artiklId" }],
    inverseJoinColumns: [{ name: "automobil", referencedColumnName: "autoId" }],
    schema: "auto_delovi",
  })
  automobils: Automobil[];

  @ManyToOne(() => Kategorija, (kategorija) => kategorija.artikls, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "kategorija", referencedColumnName: "kategorijaId" }])
  kategorija: Kategorija;

  @OneToMany(() => KorpaStavka, (korpaStavka) => korpaStavka.artikl)
  korpaStavkas: KorpaStavka[];
}
