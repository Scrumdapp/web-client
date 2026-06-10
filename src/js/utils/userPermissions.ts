import { User } from "../models/user";

export enum Role {
    Student = "STUDENT",
    Coach = "COACH"
}

export function hasRole(user: User, role: Role) {
    return user.roles.some(it => it == role)
}
