import {useContext} from "react";
import SessionStateContext from "./sessionStateContext.ts";

export function useSessionStateContext() {
    const ctx = useContext(SessionStateContext);
    if (!ctx) {
        throw new Error("Session state context was not set, ensure it is actually provided.")
    }

    return ctx
}