import { memo, useEffect } from "react"
import { useGroup } from "../../../js/context/group/useGroup"
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi"
import { useApi } from "../../../js/hooks/api/useApi"
import { GroupPresenceTrends, PresenceTrendItem } from "../../../js/models/trends"
import { LoadScreen } from "../../generic/LoadScreen"
import { ErrorScreen } from "../../generic/ErrorScreen"
import { getAttendanceBackgroundColor, getAttendanceColorScrummaster, getAttendanceLabel } from "../../../js/utils/colorUtils"
import { GroupUser } from "../../../js/models/group"
import { parseScrumdappDate, toScrumdappDate } from "../../../js/utils/scrumdappDate"
import { getWeekStart, parseWeekDay } from "../../../js/utils/timeUtils"

export interface GroupTimelineTrendsProps {
    users: GroupUser[],
    from: string,
    to: string
}

export function getGroupTimelineHeight(users: GroupUser[]) {
    return (users.length * 2 + 0.5) + "rem"
}

export const GroupTimelineTrends = memo(({ users, from, to }: GroupTimelineTrendsProps) => {
    const getGroupTimelineTrends = useApi(ScrumdappApi.getGroupTimelineTrends())
    const group = useGroup()

    useEffect(() => {
        getGroupTimelineTrends.runCommand(group.id, from, to)
    }, [group.id, from, to])

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
        <div className="vertical" style={{ height: getGroupTimelineHeight(users) }}>
            {component}
        </div>
    )
})

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
            <thead>
                <tr>
                    <th></th>
                    <th><TimelineWeekDisplays trends={data.trends[0]} /></th>
                </tr>
            </thead>
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
                        <p>{parseWeekDay(parseScrumdappDate(trend.date).getUTCDay())} {trend.date}</p>
                        <hr className="mt-1 mb-2 text-gray" />
                        <table>
                            <tbody>
                                {trend.presences.map((it, i) => (
                                    <tr key={i}>
                                        <td className="text-nowrap pr-2">{it.name}</td>
                                        <td className={`text-nowrap ${getAttendanceColorScrummaster(it.presence)}`}>{getAttendanceLabel(it.presence)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

function TimelineWeekDisplays({ trends }: { trends: PresenceTrendItem }) {
    const data: { size: number, date: Date }[] = [];

    let currWeekStart = getWeekStart(parseScrumdappDate(trends.days[0].date))
    let size = 1;
    let totalSize = 1;

    for (let i = 1; i < trends.days.length; i++) {
        const day = trends.days[i]
        const date = getWeekStart(parseScrumdappDate(day.date))
        totalSize++;
        if (toScrumdappDate(date) == toScrumdappDate(currWeekStart)) {
            size++;
        } else {
            data.push({ size, date: currWeekStart })
            currWeekStart = date
            size = 1;
        }
    }

    data.push({ size, date: currWeekStart })

    return (
        <div className="horizontal">
            {data.map((it, i) => (
                <hr className="text-fg3" key={i} style={{
                    width: `calc(${it.size / totalSize * 100}% - 4px)`,
                    marginLeft: "2px",
                    marginRight: "2px",
                    marginBottom: "2px"
                }} />
            ))}
        </div>
    )
}

