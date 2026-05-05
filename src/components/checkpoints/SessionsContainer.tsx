    import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {UseSessionTimer} from "./UseSessionTimer.tsx";
import {parseTimeStr} from "../../js/utils/timeUtils.ts";
import {LoadScreen} from "../generic/LoadScreen.tsx";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {useEffect} from "react";
import {useSessionState} from "./UseSessionStateContext.tsx";
import Checkpoints from "./Checkpoints.tsx";
    import OwnCheckpoint from "./OwnCheckpoint.tsx";

export function SessionsContainer({groupId, date}: {
    groupId: number
    date?: string
}) {
    const {refreshKey, toggleExpanded, expanded} = useSessionState();
    const getSessions = useApi(ScrumdappApi.getCheckpointSessions());

    useEffect(() => {
        getSessions.runCommand(groupId, undefined, date);
        console.log("refreshed checkpoints");
    }, [refreshKey, groupId, date, getSessions.runCommand]);

    if (getSessions.loading) {
        return <LoadScreen />
    }

    if (getSessions.error) {
        return <span>An error occurred while loading the sessions</span>
    }

    return (
        <>
            {
                getSessions.data?.map(session => (
                    <div key={session.id} className="card w-full space-x-5 my-4">
                        <h2 className="border-b-fg border-b-2 mb-2">{session.name}</h2>
                        <UseSessionTimer
                            expiryTimeStamp={parseTimeStr(session.date, session.startTime) + (session.duration * 60_000)}
                        />
                        <button className="btn" onClick={() => toggleExpanded(session.id)}>
                            {expanded.has(session.id) ? "Hide": "Show"} details
                        </button>
                        <Checkpoints session={session} />
                        <OwnCheckpoint sessionId={session.id} groupId={groupId} isLocked={false} />
                    </div>
                ))
            }
        </>
    )
}