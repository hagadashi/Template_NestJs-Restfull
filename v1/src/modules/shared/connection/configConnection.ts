import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as _ from 'lodash';

import { IConfigConnection } from "./configConnection.interface";

const validString = (value: string): boolean => _.isString(value) && value.length > 0;

export const configConnection = (config: IConfigConnection): MysqlConnectionOptions => {

    const result: MysqlConnectionOptions = {
        name: config.MYSQL_NAME,
        type: 'mysql',
        host: config.MYSQL_HOST,
        port: _.toNumber(config.MYSQL_PORT),
        username: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        entities: config.ENTITIES,
        synchronize: false,
        logging: false,
    }

    if (validString(result.name) && validString(result.host) && validString(result.username)
        && validString(result.password) && validString(result.database) && result.port > 0) {
        return result;
    }
    throw new Error('Configuration not valid');
}