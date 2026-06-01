import { useEffect } from "react"
import { useGroup } from "../../../js/context/group/useGroup"
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi"
import { useApi } from "../../../js/hooks/api/useApi"
import { GroupPresenceTrends, PresenceTrendItem } from "../../../js/models/trends"
import { LoadScreen } from "../../generic/LoadScreen"
import { ErrorScreen } from "../../generic/ErrorScreen"
import { getAttendanceBackgroundColor, getAttendanceColorScrummaster, getAttendanceLabel } from "../../../js/utils/colorUtils"
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
                        <td className="py-1"><RenderTimelineTrend trend={data.trends.find(it => it.userId == user.user_id)!} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function RenderTimelineTrend({ trend: trends }: { trend: PresenceTrendItem }) {
    return (
        <div className="horizontal gap-0.5 w-full flex-1">
            {trends.days.map((trend, i) => (
                <div
                    className={`timeline-item flex-1 dropdown ${getAttendanceBackgroundColor(trend.presences[0].presence)} hover:outline`}
                    key={i}
                >
                    <div className="dropdown-content">
                        <p>{trend.date}</p>
                        <hr className="mt-1 mb-2 text-gray" />
                        <table>
                            {trend.presences.map(it => (
                                <tr>
                                    <td className="text-nowrap pr-2">{it.name}</td>
                                    <td className={`text-nowrap ${getAttendanceColorScrummaster(it.presence)}`}>{getAttendanceLabel(it.presence)}</td>
                                </tr>
                            ))}
                        </table>
                    </div>

                </div>
            ))}
        </div >
    )
}
