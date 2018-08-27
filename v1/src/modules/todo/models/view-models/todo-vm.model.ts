import { ApiModelProperty } from "@nestjs/swagger";
import { BaseModelVm } from "../../../shared/base/base.model";
import { EnumToArray } from "../../../shared/utilities/enum-to-array";
import { TodoLevel } from "../todo-level.enum";

export class TodoVm extends BaseModelVm {
    @ApiModelProperty() id: number;
    @ApiModelProperty() content: string;
    @ApiModelProperty({ enum: EnumToArray(TodoLevel) }) level: TodoLevel;
    @ApiModelProperty() isCompleted: boolean;
}