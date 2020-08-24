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
import * as Validator from 'class-validator';


@Index("fk_kategorija_potkategorija", ["parent_kategorija"], {})
@Index("ime", ["ime"], { unique: true })
@Entity("kategorija", { schema: "auto_delovi" })
export class Kategorija {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "kategorija_id",
    unsigned: true,
  })
  id: number;

  @Column("varchar", {
    name: "ime",
    unique: true,
    length: 30,
    default: () => "'0'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(5,30)

  ime: string;

  @OneToMany(() => Artikl, (artikl) => artikl.kategorija)
  artikls: Artikl[];

  @ManyToOne(() => Kategorija, (kategorija) => kategorija.potkategorije, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "parent_kategorija", referencedColumnName: "id" }])
  parent_kategorija: Kategorija;

  @OneToMany(() => Kategorija, (kategorija) => kategorija.parent_kategorija)
  potkategorije: Kategorija[];
}
