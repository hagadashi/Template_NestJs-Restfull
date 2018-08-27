import { ConfigurationService, Configuration } from "../configuration";
import { IConfigConnection } from "./configConnection.interface";

//models
import { User } from "modules/user/models";
import { Todo } from "../../todo/models";

const config = new ConfigurationService();

export const admParams: IConfigConnection = {
    MYSQL_NAME: config.get(Configuration.ADM_CONNECTION_NAME),
    MYSQL_HOST: config.get(Configuration.ADM_HOST),
    MYSQL_PORT: config.get(Configuration.ADM_PORT),
    MYSQL_USER: config.get(Configuration.ADM_USER),
    MYSQL_PASSWORD: config.get(Configuration.ADM_PASSWORD),
    MYSQL_DATABASE: config.get(Configuration.ADM_DATABASE),
    ENTITIES: [User, Todo],
}