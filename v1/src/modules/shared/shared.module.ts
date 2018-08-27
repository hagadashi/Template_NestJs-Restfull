import { Module, Global } from '@nestjs/common';

import { MapperService } from './mapper';
import { ConfigurationService } from './configuration';
import { AuthService } from './auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';

@Global()
@Module({
    imports: [UserModule],
    providers: [ConfigurationService, AuthService, MapperService, JwtStrategyService],
    exports: [ConfigurationService, AuthService, MapperService],
})
export class SharedModule { }