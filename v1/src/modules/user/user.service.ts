import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Like } from 'typeorm';

import { User, UserRole } from './models';
import { LoginVm, UserVm } from './models/view-models';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { BaseService } from '../shared/base';
import { MapperService } from '../shared/mapper';
import { AuthService } from '../shared/auth/auth.service';
import { JwtPayload } from '../shared/auth/models/jwt-payload';

@Injectable()
export class UserService extends BaseService<User> {

    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService))
        private readonly _authService: AuthService,
    ) {
        super(_userRepository, _mapperService);
    }

    async getUsers(): Promise<UserVm[]> {
        const users = await this.find({ name: Not(Like("%WW%")) });
        return this.map<UserVm[]>(users, true);
    };

    async login(loginVm: LoginVm): Promise<LoginResponseVm> {
        const { password, id } = loginVm;

        const user = await this.findById(id);
        if (!user)
            throw new HttpException('Invalid credencials', HttpStatus.BAD_REQUEST);

        const isMatch = await this.comparePassword(user.password, password);
        if (!isMatch)
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

        user.role = UserRole.Admin;
        const payload: JwtPayload = {
            userId: user.id,
            role: user.role,
        };
        const token = await this._authService.signPayload(payload);
        const userVm: UserVm = await this.map<UserVm>(user);

        return {
            token,
            user: userVm,
        } as LoginResponseVm;
    }

    async comparePassword(password: string, input: string): Promise<boolean> {
        // return compare(input, password);
        return (input.toUpperCase() == password);
    }
}