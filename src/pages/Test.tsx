import {useApi} from "../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../js/hooks/api/scrumdappApi.ts";
import {useEffect} from "react";

export default function Test() {

    const getGroupCheckpoints = useApi(ScrumdappApi.getCheckpointSessions())
    const getCheckpoints = useApi(ScrumdappApi.getGroupCheckpoints())

    useEffect(() => {
        getGroupCheckpoints.runCommand(1, undefined, "2026-04-17" )
    }, [getGroupCheckpoints.runCommand]);

    useEffect(() => {
        getCheckpoints.runCommand(2, 5475)
    }, [getCheckpoints.runCommand]);

    if (getGroupCheckpoints.loading) {
        return <span>It is loading</span>
    }

    return (
        <>
            <h2>Checkpoints</h2>
            <div>
                {getGroupCheckpoints.data?.map((session, index) => (
                    <span>{session.id} information: {session.date} + {session.startTime} </span>
                ))}
            </div>

            <br/>

            <div>
                {getCheckpoints.data?.map((checkpoint, index) => (
                    <div>
                        <span>{checkpoint.id} information: {checkpoint.sessionId} + {checkpoint.impediment} </span>
                        <br/>
                    </div>
                ))}
            </div>
        </>
    )
}