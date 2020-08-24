import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as Validator from 'class-validator';

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
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[a-z][a-z0-9\.]{3,30}[a-z0-9]$/)
  username: string;

  @Column("varchar", { name: "password", length: 128, default: () => "'0'" })

  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  
  password: string;
}
