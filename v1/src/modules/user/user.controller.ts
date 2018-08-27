import { Controller, Post, HttpStatus, Body, HttpException, Get } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { User } from './models';
import { UserService } from './user.service';
import { LoginResponseVm, LoginVm, UserVm } from './models/view-models';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { ApiException } from '../shared/base';

@Controller('users')
@ApiUseTags(User.name)
export class UserController {

    constructor(
        private readonly _userService: UserService,
    ) { }

    @Get()
    @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.name, 'Login'))
    async getUsers(): Promise<UserVm[]> {
        return this._userService.getUsers();
    }

    @Post('login')
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.name, 'Login'))
    async login(@Body() loginVm: LoginVm): Promise<LoginResponseVm> {

        const fields = Object.keys(loginVm);
        fields.forEach(field => {
            if (!loginVm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._userService.login(loginVm);
    }
}