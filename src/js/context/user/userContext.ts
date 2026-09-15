import { createContext } from "react";
import type { User } from "../../models/user.ts";

export class UserContextState {
    user?: User
    loggedIn?: boolean
    notifyLoggedOut: () => void

    constructor(notifyLoggedOut: () => void) {
        this.notifyLoggedOut = notifyLoggedOut
    }
}

export const userContext = createContext<UserContextState | null>(null)
