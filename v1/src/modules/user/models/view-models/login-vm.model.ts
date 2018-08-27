import { ApiModelProperty } from "@nestjs/swagger";

export class LoginVm {    
    @ApiModelProperty() id: number;
    @ApiModelProperty() password: string;    
}