import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useApi} from "../../hooks/api/useApi.ts";
import {ScrumdappApi} from "../../hooks/api/scrumdappApi.ts";
import {groupUserContext, GroupUserContextState} from "./groupUserContext.ts";
import {LoadScreen} from "../../../components/generic/LoadScreen.tsx";
import {ErrorScreen} from "../../../components/generic/ErrorScreen.tsx";

export function GroupUserProvider({gId, children}: PropsWithChildren<{ gId: number }>) {
    const getGroupUsers = useApi(ScrumdappApi.getGroupUsers())
    const [groupUserState, setGroupUserState] = useState<GroupUserContextState | null>(null)

    const ContextProvider = groupUserContext.Provider

    const runCommand = useCallback(() => {
        getGroupUsers.runCommand(gId)
            .then(g => {
                const state = new GroupUserContextState();
                state.groupUsers = g;

                // eslint-disable-next-line react-hooks/immutability
                state.refresh = runCommand;
                setGroupUserState(state)
            })
    }, [getGroupUsers.runCommand, gId])

    useEffect(() => {
        runCommand()
    }, [runCommand]);

    if (getGroupUsers.loading || getGroupUsers.data == null || getGroupUsers.data.length <= 0) {
        return (
            <LoadScreen />
        )
    }

    if (getGroupUsers.error) {
        return (
            <ErrorScreen error={getGroupUsers.error} />
        )
    }

    return (
        <ContextProvider value={groupUserState}>
            {children}
        </ContextProvider>
    )
}