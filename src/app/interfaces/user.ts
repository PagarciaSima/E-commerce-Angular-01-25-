import { UserType } from "../common/user-type"

export interface User {
    id?: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    cellPhone: string,
    password: string
    userType: UserType
}
