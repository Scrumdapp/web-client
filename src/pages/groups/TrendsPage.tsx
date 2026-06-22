import { GroupUser } from "../../js/models/group"
import { useGroup } from "../../js/context/group/useGroup"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi"
import { useApiComponent } from "../../js/hooks/api/useApiComponent"
import { useState } from "react";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx"
import { TimeRangeSelector } from "../../components/groups/trends/TimeRangeSelector.tsx"
import { getGroupTimelineHeight, GroupTimelineDisplayType, GroupTimelineTrends } from "../../components/groups/trends/timeline/GroupTimelineTrends.tsx";
import { TimelineSelector } from "../../components/groups/trends/timeline/TimelineSelector.tsx";

export function TrendsPage() {

    const group = useGroup()
    const GetUsersApiComponent = useApiComponent(ScrumdappApi.getGroupUsers())

    return (
        <GetUsersApiComponent input={[group.id]}>
            {(users) => (
                <div className="vertical gap-4">
                    <div className="card">
                        <h2>Trends</h2>
                    </div>
                    <TimelineTrendsWrapper users={users} />
                </div>
            )}
        </GetUsersApiComponent>
    )
}

export function TimelineTrendsWrapper({ users }: { users: GroupUser[] }) {

    const [dates, setDates] = useState({ from: "1970-01-01", to: "1970-01-01" })
    const [displayType, setDisplayType] = useState(GroupTimelineDisplayType.Periodic)

    const rangeSelected = (from: string, to: string) => {
        setDates({ from, to })
    }

    const displaySelected = (type: GroupTimelineDisplayType) => {
        setDisplayType(type)
    }

    let component = null
    if (dates.from == "1970-01-01" || dates.to == "1970-01-01") {
        component = (
            <div className="flex" style={{ height: getGroupTimelineHeight(users) }}>
                <LoadScreen />
            </div>
        )
    } else {
        component = (
            <GroupTimelineTrends users={users} from={dates.from} to={dates.to} display={displayType} />
        )
    }

    return (
        <div className="card">
            <title>Trends | Scrumdapp</title>
            <div className="horizontal justify-between gap-2 items-center mb-4">
                <h2>Presence</h2>
                <div className="flex-1" />
                <TimelineSelector onRangeSelected={displaySelected} />
                <TimeRangeSelector onRangeSelected={rangeSelected} />
            </div>
            {component}
        </div >
    )
}
