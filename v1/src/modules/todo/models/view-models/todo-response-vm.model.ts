import { BaseResponseVm } from "../../../shared/base/base.model";
import { ApiModelProperty } from "../../../../../node_modules/@nestjs/swagger";
import { TodoVm } from "./todo-vm.model";
import { Paginator } from "../../../shared/utilities/models";

export class ResponseTodoVm extends BaseResponseVm {

    constructor(result: TodoVm[], paginator?: Paginator, count?: number) {
        super(paginator, count);
        this.result = result;
    }
    @ApiModelProperty({ isArray: true, type: TodoVm }) result: TodoVm[];
}