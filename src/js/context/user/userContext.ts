import { createContext } from "react";
import type { User } from "../../models/user.ts";

export class UserContextState {
    user?: User
    loggedIn?: boolean
    notifyLoggedOut: () => void
    refresh: () => Promise<void>

    constructor(notifyLoggedOut: () => void, refresh: () => Promise<void>) {
        this.notifyLoggedOut = notifyLoggedOut
        this.refresh = refresh
    }
}

export const userContext = createContext<UserContextState | null>(null)
