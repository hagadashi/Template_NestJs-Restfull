import { ApiModelProperty, ApiModelPropertyOptional } from "../../../../../node_modules/@nestjs/swagger";

export interface IPaginator {
    page: number;
    itensPerPage?: number;
}

export class Paginator {
    @ApiModelProperty({ default: 0, minimum: 0 })
    page: number = 0;

    @ApiModelPropertyOptional({ default: 50, maximum: 200, minimum: 0 })
    itensPerPage: number = 50;

    constructor(paginator?: IPaginator) {
        // page number >= 0
        if (paginator.page && paginator.page >= 0) this.page = paginator.page;

        // itens per page > 0 and <= 200
        if (paginator.itensPerPage && paginator.itensPerPage > 0
            && paginator.itensPerPage <= 200) this.itensPerPage = paginator.itensPerPage;
    }

    public skipToPage(): number {
        return this.itensPerPage * this.page;
    }

    public build() {
        // builda uma paginação para TypeOrm 
        return {
            skip: this.skipToPage(),
            take: this.itensPerPage,
        }
    }

    public getMaxPageOfCount(count: number){
        return Math.ceil(count / this.itensPerPage) -1; // arredonda para cima e subtrai por o index de pagina iniciar em 0
    }
}