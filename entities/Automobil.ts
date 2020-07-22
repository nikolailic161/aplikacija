import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artikl } from "./Artikl";

@Entity("automobil", { schema: "auto_delovi" })
export class Automobil {
  @PrimaryGeneratedColumn({ type: "int", name: "auto_id", unsigned: true })
  autoId: number;

  @Column("varchar", { name: "marka", length: 25, default: () => "'0'" })
  marka: string;

  @Column("varchar", { name: "model", length: 25, default: () => "'0'" })
  model: string;

  @ManyToMany(() => Artikl, (artikl) => artikl.automobils)
  artikls: Artikl[];
}
