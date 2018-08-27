import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '../../../node_modules/@nestjs/typeorm';
import { Todo } from './models';
import { admParams } from '../shared/connection';

@Module({
    imports: [TypeOrmModule.forFeature([Todo], admParams.MYSQL_NAME)],
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule { }
