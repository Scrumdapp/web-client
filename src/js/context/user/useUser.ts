import type {User} from "../../models/user.ts";
import {useContext} from "react";
import {userContext} from "./userContext.ts";

export function useUser(): User {
    const userCtx = useContext(userContext)
    if (!userCtx?.user) {
        console.error("Warning! User was not set, is it provided by the UserProvider?")
    }
    // @ts-ignore
    return userCtx?.user
}