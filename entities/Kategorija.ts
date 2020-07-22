import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artikl } from "./Artikl";

@Index("fk_kategorija_potkategorija", ["potkategorija"], {})
@Index("ime", ["ime"], { unique: true })
@Entity("kategorija", { schema: "auto_delovi" })
export class Kategorija {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "kategorija_id",
    unsigned: true,
  })
  kategorijaId: number;

  @Column("varchar", {
    name: "ime",
    unique: true,
    length: 30,
    default: () => "'0'",
  })
  ime: string;

  @OneToMany(() => Artikl, (artikl) => artikl.kategorija)
  artikls: Artikl[];

  @ManyToOne(() => Kategorija, (kategorija) => kategorija.potkategorije, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "potkategorija", referencedColumnName: "kategorijaId" }])
  parent_kategorija: Kategorija;

  @OneToMany(() => Kategorija, (kategorija) => kategorija.parent_kategorija)
  potkategorije: Kategorija[];
}
