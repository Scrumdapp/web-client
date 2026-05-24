import type {User} from "../../models/user.ts";
import {useContext} from "react";
import {userContext, UserContextState} from "./userContext.ts";


export function useUserState(): UserContextState {
    return useContext(userContext)!
}


export function useUser(): User {
    const userCtx = useContext(userContext)
    if (!userCtx?.user) {
        console.error("Warning! User was not set, is it provided by the UserProvider?")
    }
    // @ts-ignore
    return userCtx?.user
}