import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("username", ["username"], { unique: true })
@Entity("admin", { schema: "auto_delovi" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "admin_id", unsigned: true })
  adminId: number;

  @Column("varchar", {
    name: "username",
    unique: true,
    length: 30
  })
  username: string;

  @Column("varchar", { name: "password", length: 128, default: () => "'0'" })
  password: string;
}
