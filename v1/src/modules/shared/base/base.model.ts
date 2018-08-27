import { ApiModelProperty } from "@nestjs/swagger";
import { Paginator } from "../utilities/models";

export class BaseModel {

}

export class BaseModelVm {

}

export class BaseResponseVm extends BaseModelVm {

    constructor(paginator?: Paginator, count?: number) {
        super();
        const _paginator = paginator ? paginator : new Paginator();
        this.itensCount = count ? count : 0;
        this.page = _paginator.page;
        this.maxPage = _paginator.getMaxPageOfCount(this.itensCount);
    }

    @ApiModelProperty() page: number;
    @ApiModelProperty() itensCount: number;
    @ApiModelProperty() maxPage: number;
}