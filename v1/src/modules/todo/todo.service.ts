import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MapperService } from '../shared/mapper';
import { BaseService } from '../shared/base';
import { Todo, TodoLevel } from './models';
import { TodoParams } from './models/view-models';

@Injectable()
export class TodoService extends BaseService<Todo>{

    constructor(
        @InjectRepository(Todo) private readonly _todoRepository: Repository<Todo>,
        private readonly _mapperService: MapperService
    ) {
        super(_todoRepository, _mapperService);
    }

    async createTodo(param: TodoParams): Promise<Todo> {
        const { content, level } = param;

        const newTodo = new Todo();

        newTodo.content = content;
        newTodo.isCompleted = false;
        newTodo.level = TodoLevel.Normal;
        if (TodoLevel[level]) newTodo.level = TodoLevel[level];

        try {
            const result = await this.create(newTodo);
            return result;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
