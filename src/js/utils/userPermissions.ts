import { User } from "../models/user";

export enum Role {
    Student = "STUDENT",
    Coach = "COACH",
    UserManagement = "USERMANAGEMENT",
    CheckpointManagement = "CHECKPOINTMANAGEMENT",
    Scrummaster = "SCRUMMASTER",
}

export function hasRole(user: User, role: Role) {
    return user.roles.some(it => it == role)
}
