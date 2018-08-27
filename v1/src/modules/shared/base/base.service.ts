import 'automapper-ts';
import { Repository, FindConditions, FindManyOptions } from 'typeorm';
import { NotImplementedException } from '@nestjs/common';
import { MapperService } from '../mapper';

export abstract class BaseService<T>{

    protected _repository: Repository<T>;
    protected _mapper: AutoMapperJs.AutoMapper;

    constructor(repository: Repository<T>, mapService: MapperService) {
        if (!repository) throw new NotImplementedException('A Repository needs to be passed');
        this._repository = repository;
        this._mapper = mapService.mapper;
    }

    private get modelName(): string {
        return this._repository.metadata.name;
    }

    private get viewModelName(): string {
        return `${this._repository.metadata.name}Vm`;
    }

    async map<K>(
        object: Partial<T> | Partial<T>[],
        isArray: boolean = false,
        souceKey?: string,
        destinationKey?: string
    ): Promise<K> {
        const _sourceKey = isArray
            ? `${souceKey || this.modelName}[]`
            : souceKey || this.modelName;
        const _destinationKey = isArray
            ? `${destinationKey || this.viewModelName}[]`
            : destinationKey || this.viewModelName;
        return this._mapper.map(_sourceKey, _destinationKey, object);
    }

    async find(filter?: FindConditions<T> | FindManyOptions<T>): Promise<T[]> {
        return this._repository.find(filter);
    }

    async findAndCount(filter?: FindConditions<T> | FindManyOptions<T>): Promise<[T[], number]> {
        return this._repository.findAndCount(filter);
    }

    async findById(id: number | string): Promise<T> {
        return this._repository.findOne(id);
    }

    async findByIds(ids: number[] | string[]): Promise<T[]> {
        return this._repository.findByIds(ids);
    }

    async create(itens: any): Promise<T> {
        return this._repository.save(itens);
    }

    async creates(itens: any[]): Promise<T[] | T> {
        return this._repository.save(itens);
    }

    async delete(itens: | T): Promise<T> {
        return this._repository.remove(itens);
    }

    async update(id: string | number, item: any): Promise<any> {
        return this._repository.update(id, item);
    }
}