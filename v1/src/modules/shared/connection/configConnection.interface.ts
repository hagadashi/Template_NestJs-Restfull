import { EntitySchema } from "../../../../node_modules/typeorm";

export interface IConfigConnection {

    readonly MYSQL_NAME: string;

    readonly MYSQL_HOST: string;

    readonly MYSQL_PORT: number | string;

    readonly MYSQL_USER: string;

    readonly MYSQL_PASSWORD: string;

    readonly MYSQL_DATABASE: string;

    readonly ENTITIES: (string | Function | EntitySchema<any>)[];

}
