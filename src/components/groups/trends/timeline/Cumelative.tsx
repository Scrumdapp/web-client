import { GroupUser } from "../../../../js/models/group"
import { GroupPresenceTrends, PresenceTrendItem } from "../../../../js/models/trends"
import { getAttendanceLabel } from "../../../../js/utils/colorUtils"
import { HideIf } from "../../../utility/Conditional"
import { HideIfNotFullyVisible } from "../../../utility/Text"

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

    const map = [
        { id: "ON_TIME", color: "bg-green", children: [{ id: "ONLINE", color: "bg-purple" }] },
        { id: "VERIFIED_LATE", color: "bg-orange", children: [{ id: "LATE", color: "bg-orange-dim" }] },
        { id: "VERIFIED_ABSENT", color: "bg-red", children: [{ id: "ABSENT", color: "bg-red-dim" }] },
        { id: "SICK", color: "bg-blue", children: [] },
        { id: null, color: "bg-gray-dim", children: [] }
    ]

    let total = 0;
    const presenceData = new Map<string | null, number>()

    for (const day of trends.days) {
        for (const presence of day.presences) {
            presenceData.set(presence.presence, (presenceData.get(presence.presence) ?? 0) + 1)
            total++
        }
    }

    return (
        <div className="horizontal w-full flex-1">
            {map.map((item, i) => {
                let selfTotal = presenceData.get(item.id) ?? 0
                let selfCount = selfTotal

                for (const child of item.children) {
                    if ((presenceData.get(child.id) ?? 0) == 0) {
                        continue
                    }
                    selfTotal += presenceData.get(child.id) ?? 0
                }

                if (selfTotal == 0) {
                    return null
                }

                return (
                    <div
                        className={`timeline-item dropdown relative ${item.color} hover:outline`}
                        key={i}
                        style={{
                            width: `calc(${selfTotal / total * 100}% - 4px)`,
                            marginLeft: "2px",
                            marginRight: "2px",
                            marginBottom: "2px",
                            paddingLeft: "4px"
                        }}
                    >
                        <div className="absolute bottom-0 top-0 left-0 right-0 flex">
                            <div style={{ width: `${selfCount / selfTotal * 100}%` }}></div>
                            {item.children.filter(it => (presenceData.get(it.id) ?? 0) != 0).map(it => (
                                <div key={it.id} className={it.color} style={{
                                    width: `calc(${(presenceData.get(it.id) ?? 0) / selfTotal * 100}%)`,
                                }} />
                            ))}
                        </div>
                        <HideIf condition={selfTotal == 0}>
                            <HideIfNotFullyVisible className="absolute text-bg_h">
                                {selfTotal}x
                            </HideIfNotFullyVisible>
                        </HideIf>
                        <div className="dropdown-content">
                            <HideIf condition={selfCount == 0}>
                                <div>
                                    {getLabelName(item.id)}: <span className={item.color + " rounded-md text-bg_h px-1"}>{selfCount}x</span>
                                </div>
                            </HideIf>
                            {item.children.filter(it => (presenceData.get(it.id) ?? 0) != 0).map(it => (
                                <div key={it.id}>
                                    {getLabelName(it.id)}: <span className={it.color + " rounded-md text-bg_h px-1"}>{presenceData.get(it.id)}x</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function getLabelName(id: string | null) {
    const n = getAttendanceLabel(id)
    return n == "---" ? "No Data" : n
}
