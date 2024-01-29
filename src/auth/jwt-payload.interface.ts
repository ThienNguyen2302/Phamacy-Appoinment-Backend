import {AccountRole} from "./accounts.entity"

export interface JwtPayload {
    id: string;
    username: string;
    role: AccountRole;
}