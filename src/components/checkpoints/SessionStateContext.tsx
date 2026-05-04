import {createContext} from "react";
import {useSessionStateContext} from "./UseSessionStateContext.tsx";

const SessionStateContext = createContext<ReturnType<typeof useSessionStateContext> | null>(null)

export default SessionStateContext