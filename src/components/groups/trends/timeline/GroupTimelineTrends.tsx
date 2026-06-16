import { memo, useEffect } from "react"
import { useGroup } from "../../../../js/context/group/useGroup"
import { ScrumdappApi } from "../../../../js/hooks/api/scrumdappApi"
import { useApi } from "../../../../js/hooks/api/useApi"
import { GroupUser } from "../../../../js/models/group"
import { LoadScreen } from "../../../generic/LoadScreen"
import { ErrorScreen } from "../../../generic/ErrorScreen"
import { attendanceOptions } from "../../../../js/utils/colorUtils"
import { RenderCumelativeGraph } from "./Cumelative"
import { RenderTimelineGraph } from "./Periodic"
import { ApiError } from "../../../../js/hooks/api/apiError"

export enum GroupTimelineDisplayType {
    Periodic,
    Cumelative
}

export interface GroupTimelineTrendsProps {
    users: GroupUser[],
    from: string,
    to: string,
    display: GroupTimelineDisplayType
}

export function getGroupTimelineHeight(users: GroupUser[]) {
    return (users.length * 2 + 2.5) + "rem"
}


export const GroupTimelineTrends = memo(({ users, from, to, display }: GroupTimelineTrendsProps) => {
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
    } else if (getGroupTimelineTrends.data.trends.length == 0) {
        component = <ErrorScreen error={new ApiError(999, "No trends available")} />
    } else if (display == GroupTimelineDisplayType.Cumelative) {
        component = <RenderCumelativeGraph users={users} data={getGroupTimelineTrends.data} />
    } else {
        component = <RenderTimelineGraph users={users} data={getGroupTimelineTrends.data} />
    }

    return (
        <>
            <div className="vertical" style={{ height: getGroupTimelineHeight(users) }}>
                {component}
            </div>
            <div className="horizontal gap-4 flex-wrap border border-gray! rounded-md p-2">
                {attendanceOptions.map(it => (
                    <div className="horizontal gap-2 items-center">
                        <div className={`w-4 h-4 rounded-sm ${it.background}`}></div>
                        <p className="text-fg2">{it.label === "---" ? "No Data" : it.label}</p>
                    </div>
                ))}
            </div >
        </>
    )
})
