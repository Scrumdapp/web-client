import {createContext} from "react";

import {useSessionStateContext} from "../../hooks/sessions/useSessionState.ts";

const SessionStateContext = createContext<ReturnType<typeof useSessionStateContext> | null>(null)

export default SessionStateContext