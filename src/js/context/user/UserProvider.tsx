import type { PropsWithChildren, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { userContext, UserContextState } from "./userContext.ts";
import { useApi } from "../../hooks/api/useApi.ts";
import { ScrumdappApi } from "../../hooks/api/scrumdappApi.ts";
import type { ApiError } from "../../hooks/api/apiError.ts";
import { useModalState } from "../../hooks/useModalState.ts";
import { LoginModal } from "../../../components/modals/LoginModal.tsx";
import { useEventChannel } from "../../events/useEventChannel.ts";
import { EventBus } from "../../events/eventBus.ts";

export function UserProvider({ children, loading, error }: PropsWithChildren<{ loading: ReactNode, error: (error: ApiError) => ReactNode }>): ReactNode {
    const loginModalState = useModalState()
    const [didInitialLoad, setDidDoneInitialLoad] = useState(false)
    const [hasLoadedWithUser, setHasLoadedWithUser] = useState(false)
    const getUserData = useApi(ScrumdappApi.getCurrentUser())

    const refresh = useCallback(() => {
        return getUserData.runCommand()
            .then(user => {
                setState(it => {
                    it.user = user
                    return it
                })
                if (user != null) {
                    setHasLoadedWithUser(true)
                }
                loginModalState.close()
            })
            .catch(() => { })
            .finally(() => {
                setDidDoneInitialLoad(true)
            })
    }, [])

    const [state, setState] = useState(new UserContextState(refresh))

    useEffect(() => { refresh() }, [])

    useEventChannel(EventBus.on401Detected, () => {
        loginModalState.open()
    }, [])

    if (getUserData.loading && !loginModalState.isOpen) {
        return loading
    }

    if (getUserData.error && getUserData.error.status != 401) {
        return error(getUserData.error)
    }

    if (!didInitialLoad) {
        return loading
    }

    return (
        <userContext.Provider value={state}>
            {hasLoadedWithUser && children}
            <LoginModal state={loginModalState} />
        </userContext.Provider>
    )
}
