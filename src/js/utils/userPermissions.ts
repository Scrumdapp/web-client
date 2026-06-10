import { User } from "../models/user";

export enum Role {
    Student = "STUDENT",
    Docent = "DOCENT"
}

export function hasRole(user: User, role: Role) {
    return user.roles.some(it => it == role)
}
