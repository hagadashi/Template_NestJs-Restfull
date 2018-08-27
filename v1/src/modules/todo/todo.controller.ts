import {
    Controller, Post, HttpStatus, Get, Put, Delete, HttpException,
    HttpCode, Query, Param, Body, UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { In } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { TodoService } from './todo.service';
import { Todo, TodoLevel } from './models';
import { TodoParams, TodoVm, ResponseTodoVm } from './models/view-models';
import { ApiException } from '../shared/base';
import { GetOperationId } from '../shared/utilities';
import { Paginator } from '../shared/utilities/models';
import { ToBooleanPipe } from '../shared/pipes/to-bolean.pipe';
import { makeArrayOf } from '../shared/utilities/make-array-of';
import { FilterFactor } from '../shared/utilities/models/filter.model';
import { Roles } from '../shared/decorators';
import { UserRole } from '../user/models';
import { RolesGuard } from '../shared/guards';

@Controller('todos')
@ApiUseTags(Todo.name)
@ApiBearerAuth()
export class TodoController {

    constructor(
        private readonly _todoService: TodoService
    ) {

    }

    @Get()
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, type: ResponseTodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Todo.name, 'GetAll'))
    @ApiImplicitQuery({ name: 'level', required: false, isArray: true, collectionFormat: 'multi' })
    @ApiImplicitQuery({ name: 'isCompleted', required: false, type: Boolean })
    @ApiImplicitQuery({ name: 'count', required: false, type: Number })
    @ApiImplicitQuery({ name: 'page', required: false, type: Number })
    async get(
        @Query('page') page?: number, @Query('count') count?: number,
        @Query('level') level?: TodoLevel, @Query('isCompleted', new ToBooleanPipe()) isCompleted?: boolean,
    ): Promise<ResponseTodoVm> {
        // Monta a paginação para não vir registros infinitos
        const paginator = new Paginator({ page: page, itensPerPage: count });

        // Monta filtro caso exista
        const filter = new FilterFactor()
            .setPage(paginator)
            .addWhere('_level', In(makeArrayOf(level)))
            .addWhere('isCompleted', isCompleted)
            .build();

        try {
            const [todos, count] = await this._todoService.findAndCount(filter);
            const result = await this._todoService.map<TodoVm[]>(todos, true);
            return new ResponseTodoVm(result, paginator, count);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: HttpStatus.CREATED, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Todo.name, 'Create'))
    async create(@Body() params: TodoParams): Promise<TodoVm> {
        const { content } = params;

        if (!content) {
            throw new HttpException('Contetn is required', HttpStatus.BAD_REQUEST)
        }

        try {
            const newTodo = await this._todoService.createTodo(params);
            return this._todoService.map<TodoVm>(newTodo);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Put()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: HttpStatus.CREATED, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ApiException })
    @ApiOperation(GetOperationId(Todo.name, 'Update'))
    async update(@Body() vm: TodoVm): Promise<TodoVm> {
        const { id, content, level, isCompleted } = vm;

        if (!vm || !id) {
            throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
        }

        const exist = await this._todoService.findById(id);
        if (!exist) {
            throw new HttpException(`Todo id: ${id} Not found`, HttpStatus.NOT_FOUND);
        }

        if (exist.isCompleted) {
            throw new HttpException('Already completed', HttpStatus.BAD_REQUEST);
        }

        if (content) exist.content = content;
        if (isCompleted) exist.isCompleted = isCompleted;
        if (level) exist.level = level;

        try {
            const updated = await this._todoService.update(id, exist);
            return this._todoService.map<TodoVm>(exist);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ApiException })
    @ApiOperation(GetOperationId(Todo.name, 'Delete'))
    async delete(@Param('id') id: number): Promise<void> { // TodoVm

        const exist: Todo = await this._todoService.findById(id);
        if (!exist) {
            throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
        }

        try {
            const deleted = await this._todoService.delete(exist);
            return;
            // return this._todoService.map<TodoVm>(deleted);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
