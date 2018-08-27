import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseModel } from "../../shared/base";
import { TodoLevel } from "./todo-level.enum";

@Entity('tb_todo')
export class Todo extends BaseModel {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "content" })
    content: string;

    @Column({ name: "level" })
    private _level: string;

    @Column({ name: "isCompleted" })
    isCompleted: boolean;

    get level(): TodoLevel {
        return TodoLevel[this._level];
    }
    set level(value: TodoLevel) {
        this._level = value;
    }

    static get modelName(): string {
        return Todo.name;
    }
}