import { ApiModelProperty } from "@nestjs/swagger";
import { TodoLevel } from "../todo-level.enum";
import { EnumToArray } from "../../../shared/utilities";

export class TodoParams {
    @ApiModelProperty() content: string;
    @ApiModelProperty({ enum: EnumToArray(TodoLevel), example: TodoLevel.Normal }) level?: TodoLevel;
}