import { TypeOrmModule } from '../../../node_modules/@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models';
import { admParams } from '../shared/connection';

@Module({
    imports: [
        TypeOrmModule.forFeature([User], admParams.MYSQL_NAME),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
