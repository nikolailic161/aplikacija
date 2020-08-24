import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Artikl } from "./Artikl";
import * as Validator from 'class-validator';

@Entity("automobil", { schema: "auto_delovi" })
export class Automobil {
  @PrimaryGeneratedColumn({ type: "int", name: "auto_id", unsigned: true })
  autoId: number;

  @Column("varchar", { name: "marka", length: 25, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  marka: string;

  @Column("varchar", { name: "model", length: 25, default: () => "'0'" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  model: string;

  @ManyToMany(type=>Artikl,artikl=>artikl.automobils)
  @JoinTable({
    name:"artikl_automobil",
    joinColumn: {name:"automobil", referencedColumnName: "autoId"},
    inverseJoinColumn: {name: "artikl", referencedColumnName: "artiklId"}
  })
  artikls: Artikl[];
}
