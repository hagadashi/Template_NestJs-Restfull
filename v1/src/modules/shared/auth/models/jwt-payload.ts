import { UserRole } from "modules/user/models";

export interface JwtPayload {
    userId: number;
    role: UserRole;
    iat?: Date;
    exp?: Date;
}