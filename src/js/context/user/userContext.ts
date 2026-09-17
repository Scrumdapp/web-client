import { createContext } from "react";
import type { User } from "../../models/user.ts";

export class UserContextState {
    user?: User
    loggedIn?: boolean
    refresh: () => Promise<void>

    constructor(refresh: () => Promise<void>) {
        this.refresh = refresh
    }
}

export const userContext = createContext<UserContextState | null>(null)
