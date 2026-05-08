import {createContext} from "react";

import {useSessionState} from "../../hooks/sessions/useSessionState.ts";

const SessionStateContext = createContext<ReturnType<typeof useSessionState> | null>(null)

export default SessionStateContext