    import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {calculateExpiryTime} from "../../js/utils/timeUtils.ts";
import {LoadScreen} from "../generic/LoadScreen.tsx";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {useEffect} from "react";
import CheckpointTable from "./CheckpointTable.tsx";
import OwnCheckpoint from "./OwnCheckpoint.tsx";
    import {useSessionStateContext} from "../../js/context/sessions/useSessionStateContext.ts";
    import {UseSessionTimer} from "./UseSessionTimer.tsx";

export function SessionsContainer({groupId, date}: {
    groupId: number
    date?: string
}) {
    const {useInvalidation, toggleExpanded, expanded} = useSessionStateContext();
    const sessionVersion = useInvalidation({type: "sessions"});

    const getSessions = useApi(ScrumdappApi.getCheckpointSessions());

    useEffect(() => {
        getSessions.runCommand(groupId, undefined, date);
    }, [sessionVersion, groupId, date, getSessions.runCommand]);

    useEffect(() => {
        if (getSessions.data && getSessions.data.length > 0) {
            toggleExpanded(getSessions.data[getSessions.data.length - 1].id);
        }
    }, [getSessions.data, toggleExpanded]);

    const filteredSessions = () => {
        return getSessions.data ? [...getSessions.data].reverse() : [];
    };

    if (getSessions.loading) {
        return <LoadScreen />
    }

    if (getSessions.error) {
        return <span>An error occurred while loading the sessions</span>
    }

    return (
        <>
            {
                filteredSessions()?.map(session => (
                    <div key={session.id} className="card w-full space-x-5 my-4">
                        <h2 className="border-b-fg border-b-2 mb-2">{session.name}</h2>
                        <UseSessionTimer
                            expiryTimeStamp={calculateExpiryTime(session)}
                        />
                        <button className="btn" onClick={() => toggleExpanded(session.id)}>
                            {expanded.has(session.id) ? "Hide": "Show"} details
                        </button>
                        <CheckpointTable sessionId={session.id} />
                        <OwnCheckpoint session={session} groupId={groupId} lock={calculateExpiryTime(session) <= 0} />
                    </div>
                ))
            }
        </>
    )
}