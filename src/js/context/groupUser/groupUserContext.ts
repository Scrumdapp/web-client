import {GroupUser} from "../../models/group.ts";
import {createContext} from "react";

export class GroupUserContextState {
    groupUsers?: GroupUser[]
    refresh?: () => void
}

export const groupUserContext = createContext<GroupUserContextState | null>(null)