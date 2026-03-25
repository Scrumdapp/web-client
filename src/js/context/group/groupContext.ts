import {Group} from "../../models/group.ts";
import {createContext} from "react";


export class GroupContextState {
    group: Group
    refresh: () => void
}

export const groupContext = createContext<GroupContextState | null>(null)