import {useSessionState} from "../../hooks/sessions/useSessionState.ts";
import {ReactNode} from "react";
import SessionStateContext from "./sessionStateContext.ts";

export function SessionStateProvider({state, children}: {
    state: ReturnType<typeof useSessionState>
    children: ReactNode
}) {
    return (
        <SessionStateContext.Provider value={state}>
            {children}
        </SessionStateContext.Provider>
    )
}