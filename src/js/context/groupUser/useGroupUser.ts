import {GroupUser} from "../../models/group.ts";
import {useContext} from "react";
import {groupUserContext} from "./groupUserContext.ts";

export function useGroupUser(): GroupUser[] {
    const ctx = useContext(groupUserContext)
    if (!ctx?.groupUsers) {
        console.error("Warning! Group users was not set, ensure it is actually provided.")
    }

    // @ts-ignore
    return ctx?.groupUsers
}