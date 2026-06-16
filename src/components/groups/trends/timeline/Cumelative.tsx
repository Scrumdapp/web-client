import { GroupUser } from "../../../../js/models/group"
import { GroupPresenceTrends, PresenceTrendItem } from "../../../../js/models/trends"
import { attendanceOptions, getAttendanceBackgroundColor, getAttendanceColorScrummaster, getAttendanceLabel } from "../../../../js/utils/colorUtils"
import { parseScrumdappDate } from "../../../../js/utils/scrumdappDate"
import { parseWeekDay } from "../../../../js/utils/timeUtils"

export function RenderCumelativeGraph({ users, data }: { users: GroupUser[], data: GroupPresenceTrends }) {
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
                        <td className="py-1"><RenderCumelativeTrend trend={data.trends.find(it => it.userId == user.user_id)!} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function RenderCumelativeTrend({ trend: trends }: { trend: PresenceTrendItem }) {

    let total = 0;
    const presenceData = new Map<string | null, number>()

    for (const day of trends.days) {
        for (const presence of day.presences) {
            presenceData.set(presence.presence, (presenceData.get(presence.presence) ?? 0) + 1)
            total++
        }
    }

    const sortedAttendence = attendanceOptions.filter(it => presenceData.has(it.value))


    return (
        <div className="horizontal w-full flex-1">
            {sortedAttendence.map((trend, i) => (
                <div
                    className={`timeline-item dropdown ${getAttendanceBackgroundColor(trend.value)}`}
                    key={i}
                    style={{
                        width: `calc(${presenceData.get(trend.value)! / total * 100}% - 4px)`,
                        marginLeft: "2px",
                        marginRight: "2px",
                        marginBottom: "2px",
                        paddingLeft: "4px"
                    }}
                >
                    <span className="text-bg_h">{presenceData.get(trend.value)}x</span>
                    <div className="dropdown-content">
                        {trend.label == "---" ? "No Data" : trend.label}: <span className={trend.color}>{presenceData.get(trend.value)}x</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
