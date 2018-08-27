import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRole } from "./user-roles.enum";
import { BaseModel } from "../../shared/base";

@Entity('tb_funcionario')
export class User extends BaseModel {

    @PrimaryGeneratedColumn({ name: "CD_FUNCIONARIO" })
    id: number;

    @Column({name:"FUNCIONARIO"})
    name?: string;

    @Column({name:"SENHA"})
    password: string;

    role?: UserRole;

}