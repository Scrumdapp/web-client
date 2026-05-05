import {useApi} from "../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {useGroupUser} from "../../js/context/groupUser/useGroupUser.ts";
import {LoadScreen} from "../generic/LoadScreen.tsx";
import {getAttendanceColor, getformatPresence, getStarsColor} from "../../js/utils/colorUtils.ts";
import Stars from "../checkins/checkpointcomponents/Stars.tsx";
import {useEffect} from "react";
import {useSessionState} from "../../js/context/sessions/useSessionState.ts";

export default function CheckpointTable({ sessionId }: {
    sessionId: number
}) {

    const groupUsers = useGroupUser();
    const {useInvalidation, isExpanded } = useSessionState()
    const checkpointVersion = useInvalidation({type: "checkpoints", sessionId: sessionId});

    const expanded = isExpanded(sessionId);

    const getCheckpoints = useApi(ScrumdappApi.getGroupCheckpointsBySession());

    function getFullName(userId: number): string | null {
        const user = groupUsers.find(it => it.user_id == userId);
        if (user == undefined) return null
        return `${user?.first_name} ${user?.last_name}`
    }

    useEffect(() => {
        if (!groupUsers?.length || !sessionId) return;

        getCheckpoints.runCommand(groupUsers[0].group_id, sessionId);
    }, [checkpointVersion]);

    if (getCheckpoints.loading) {
        return <LoadScreen />
    }

    if (getCheckpoints.error) {
        return <span>An error occurred while loading in checkpoints.</span>
    }

    if (!expanded) {
        return null
    }

    return (
        <table className="table-fixed w-full">
            <thead>
                <tr>
                    <th className="py-3 text-left">Name</th>
                    <th className="py-3 text-left pl-2 border-l border-dotted">Attendance</th>
                    <th className="py-3 items-center pl-2">How're you feeling?</th>
                    <th className="py-3 text-center pl-2 w-[25%]">Comment</th>
                    <th className="py-3 text-center pl-2 w-[25%]">Obstacle</th>
                </tr>
            </thead>
            <tbody>
            {getCheckpoints.data?.map(cp => (
                <tr key={cp.id}>
                    <td className="py-3 text-left pl-2 name-field border-r border-t border-dotted border-current!">
                        {getFullName(cp.groupUser)}
                    </td>
                    <td className="checkpoint-table-cell border-current">
                        <div className={`${getAttendanceColor(getformatPresence(cp.presence ? cp.presence : "---"))}`}>
                            {getformatPresence(
                                cp.presence ? cp.presence : "---",
                            )}
                        </div>
                    </td>
                    <td className="checkpoint-table-cell border-current">
                        <div className={`flex justify-center items-center ${getStarsColor(cp.stars)}`}>
                            <Stars amount={cp.stars} />
                        </div>
                    </td>
                    <td className="checkpoint-table-cell">{cp.comment}</td>
                    <td className="checkpoint-table-cell">{cp.impediment}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}