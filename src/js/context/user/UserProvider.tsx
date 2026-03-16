import type {PropsWithChildren, ReactNode} from "react";
import {useEffect, useState} from "react";
import {userContext, UserContextState} from "./userContext.ts";
import {useApi} from "../../hooks/api/useApi.ts";
import {ScrumdappApi} from "../../hooks/api/scrumdappApi.ts";
import type {ApiError} from "../../hooks/api/apiError.ts";

export function UserProvider({ children, loading, error } : PropsWithChildren<{ loading: ReactNode, error: (error: ApiError) => ReactNode }> ): ReactNode {
    const [ state, setState ] = useState(new UserContextState())

    const getUserData = useApi(ScrumdappApi.getCurrentUser())

    useEffect(() => {
        getUserData.runCommand().then(user => {
            setState(it => {
                it.user = user
                return it
            })
        })
    }, [getUserData.runCommand])

    if (getUserData.loading) {
        return loading
    }

    if (getUserData.error) {
        return error(getUserData.error)
    }

    if (!state.user) {
        return loading
    }

    return (
        <userContext.Provider value={state}>
            {children}
        </userContext.Provider>
    )
}