import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignOptions, sign, verify } from 'jsonwebtoken';

import { ConfigurationService, Configuration } from '../configuration';
import { JwtPayload } from './models/jwt-payload';
import { User } from 'modules/user/models';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        readonly _userService: UserService,
        private readonly _configurationService: ConfigurationService,
    ) {
        this.jwtOptions = { expiresIn: '12h', algorithm:'HS256' }; //  ,
        this.jwtKey = _configurationService.get(Configuration.JWT_KEY);
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validatePayload(payload: JwtPayload): Promise<User> {
        return this._userService.findById(payload.userId);
    }
}