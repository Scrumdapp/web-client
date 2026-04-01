import {useApi} from "../../hooks/api/useApi.ts";
import {ScrumdappApi} from "../../hooks/api/scrumdappApi.ts";
import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {groupContext, GroupContextState} from "./groupContext.ts";
import {LoadScreen} from "../../../components/generic/LoadScreen.tsx";
import {ErrorScreen} from "../../../components/generic/ErrorScreen.tsx";

export function GroupProvider({ groupId, children }: PropsWithChildren<{ groupId: number }>) {
    const getGroupData = useApi(ScrumdappApi.getGroup())
    const [groupState, setGroupState] = useState<GroupContextState | null>(null)

    const runCommand = useCallback(() => {
        getGroupData.runCommand(groupId)
            .then(it => {
                const state = new GroupContextState();
                state.group = it
                state.refresh = runCommand;
                setGroupState(state)
            })
    }, [getGroupData.runCommand, groupId])

    useEffect(() => {
        runCommand()
    }, [runCommand]);

    if (getGroupData.loading || getGroupData.data == null) {
        return (
            <LoadScreen />
        )
    }

    if (getGroupData.error) {
        return (
            <ErrorScreen error={getGroupData.error} />
        )
    }

    const Provider = groupContext.Provider
    return (
        <Provider value={groupState}>
            {children}
        </Provider>
    )
}