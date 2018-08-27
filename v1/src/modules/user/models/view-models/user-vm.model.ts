import { UserRole } from "..";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { BaseModelVm } from "../../../shared/base/base.model";
import { EnumToArray } from "../../../shared/utilities/enum-to-array";

export class UserVm extends BaseModelVm {
    @ApiModelProperty() id: number;
    @ApiModelProperty() name: string;
    @ApiModelPropertyOptional({enum: EnumToArray(UserRole)}) role?: UserRole;
}