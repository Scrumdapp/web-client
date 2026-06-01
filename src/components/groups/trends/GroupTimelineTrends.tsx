import { useEffect } from "react"
import { useGroup } from "../../../js/context/group/useGroup"
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi"
import { useApi } from "../../../js/hooks/api/useApi"
import { GroupPresenceTrends, PresenceTrendItem } from "../../../js/models/trends"
import { LoadScreen } from "../../generic/LoadScreen"
import { ErrorScreen } from "../../generic/ErrorScreen"
import { getAttendanceBackgroundColor } from "../../../js/utils/colorUtils"
import { GroupUser } from "../../../js/models/group"

export interface GroupTimelineTrendsProps {
    users: GroupUser[]
}

export function GroupTimelineTrends({ users }: GroupTimelineTrendsProps) {

    const getGroupTimelineTrends = useApi(ScrumdappApi.getGroupTimelineTrends())
    const group = useGroup()

    useEffect(() => {
        getGroupTimelineTrends.runCommand(group.id)
    }, [group.id])

    let component = null;

    if (getGroupTimelineTrends.loading) {
        component = <LoadScreen />
    } else if (getGroupTimelineTrends.error) {
        component = <ErrorScreen error={getGroupTimelineTrends.error} />
    } else if (getGroupTimelineTrends.data == null) {
        component = <LoadScreen />
    } else {
        component = <RenderTimelineGraph users={users} data={getGroupTimelineTrends.data} />
    }

    return (
        <div className="vertical" style={{ minHeight: (users.length * 2) + "rem" }}>
            {component}
        </div>
    )
}

function RenderTimelineGraph({ users, data }: { users: GroupUser[], data: GroupPresenceTrends }) {
    const length = data.trends[0].days.length

    if (length == 0) {
        return (
            <div className="center">
                No data available
            </div>
        )
    }

    return (
        <table>
            <tbody>
                {users.map((user) => (
                    <tr key={user.user_id}>
                        <td className="w-48 pr-2">{user.first_name} {user.last_name}</td>
                        <td className="py-2"><RenderTimelineTrend trend={data.trends.find(it => it.userId == user.user_id)!} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function RenderTimelineTrend({ trend }: { trend: PresenceTrendItem }) {
    return (
        <div className="horizontal gap-0.5 w-full rounded-md flex-1 overflow-hidden">
            {trend.days.map((trend, i) => (
                <div className="vertical flex-1 gap-0.5" key={i}>
                    {trend.presences.map((presence) => (
                        <div key={presence.sessionId} className={`min-h-3 h-full flex-1 ${getAttendanceBackgroundColor(presence.presence)}`}>
                        </div>
                    ))}
                </div>
            ))}
        </div >
    )
}
