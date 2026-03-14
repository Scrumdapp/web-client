import {createContext} from "react";
import type {User} from "../../models/user.ts";

export class UserContextState {
    user?: User
}

export const userContext = createContext<UserContextState | null>(null)