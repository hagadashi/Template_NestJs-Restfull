import { Injectable } from '@nestjs/common';
import { Configuration } from '.';
import { get } from 'config';

@Injectable()
export class ConfigurationService {

    private readonly environmentHosting: string = process.env.NODE_ENV || 'development';

    get(name: string): string {
        return process.env[name] || get(name);
    }

    get isDevelopment(): boolean {
        return this.environmentHosting === 'development';
    }

    get swaggerEnabled(): boolean {
        const enabled = this.get(Configuration.SWAGGER_ENABLE).toLowerCase();
        return (enabled == 'true')
            || (enabled === '1');
    }
}
