import {Group} from "../../models/group.ts";
import {useContext} from "react";
import {groupContext} from "./groupContext.ts";

export function useGroup(): Group {
    const groupCtx = useContext(groupContext)
    if (!groupCtx?.group) {
        console.error("Warning! User was not set, is it provided by the UserProvider?")
    }
    // @ts-ignore
    return groupCtx?.group
}
