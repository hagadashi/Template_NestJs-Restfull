import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { TypeOrmModule } from '../node_modules/@nestjs/typeorm';
import { ConfigurationService, Configuration } from 'modules/shared/configuration';
import { configConnection, admParams } from 'modules/shared/connection';
// Modules
import { SharedModule } from 'modules/shared/shared.module';
import { UserModule } from 'modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(configConnection(admParams)),
        SharedModule, UserModule, TodoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

    static host: string;
    static port: number | string;
    static prefix: string;
    static isDev: boolean;
    static swaggerEnabled: boolean;

    constructor(private readonly _configurationService: ConfigurationService) {
        // pupulando variáveis estaticas
        AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
        AppModule.host = _configurationService.get(Configuration.HOST);
        AppModule.prefix = _configurationService.get(Configuration.API_PREFIX);
        AppModule.isDev = _configurationService.isDevelopment;
        AppModule.swaggerEnabled = _configurationService.swaggerEnabled;
    }

    private static normalizePort(param: number | string): number | string {
        const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
        if (isNaN(portNumber)) return param;
        else if (portNumber >= 0) return portNumber;
    }
}
