import { UserVm } from ".";
import { ApiModelProperty } from "../../../../../node_modules/@nestjs/swagger";

export class LoginResponseVm {
    @ApiModelProperty() token: string;
    @ApiModelProperty() user: UserVm;
}