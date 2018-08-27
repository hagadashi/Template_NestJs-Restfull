import { FindManyOptions, FindOperator } from "typeorm";
import { Paginator } from "./paginator.model";
import { includes, isArray } from 'lodash';
import { isObject } from "util";

export class FilterFactor {

    private _filtro: FindManyOptions = {};

    constructor(obj?: FindManyOptions) {
        if (obj) this._filtro = obj;
        if (!includes(Object.keys(this._filtro), 'where')) // Inclui o field Where se não existir
            this._filtro['where'] = {};
    }

    setPage(paginator: Paginator): FilterFactor {
        this._filtro['skip'] = paginator.skipToPage();
        this._filtro['take'] = paginator.itensPerPage;
        return this;
    }

    addWhere(param: string, value: any): FilterFactor {
        let temp = value;
        if (isObject(value) && !includes(Object.keys(value), 'FindOperator')) // Se for o objeto FindOperator -> 
            temp = isArray(value._value) ? value._value[0] : value._value;    // Checar seu valor com base no "_value" 
        if (temp != undefined && temp != null) {
            this._filtro.where[param] = value; // ->  Só adiciona filtro se houver um valor
        }
        return this;
    }

    build(): FindManyOptions {
        return this._filtro;
    }
}