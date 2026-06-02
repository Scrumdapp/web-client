import { getGroupTimelineHeight, GroupTimelineTrends } from "../../components/groups/trends/GroupTimelineTrends"
import { GroupUser } from "../../js/models/group"
import { useGroup } from "../../js/context/group/useGroup"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi"
import { useApiComponent } from "../../js/hooks/api/useApiComponent"
import { GroupTimelineTrendsWeather } from "../../components/groups/trends/GroupTimelineTrendsWeather.tsx";
import { useState } from "react";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx"
import { TimeRangeSelector } from "../../components/groups/trends/TimeRangeSelector.tsx"

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
                    <div className="card">
                        <h2>Weather</h2>
                        <GroupTimelineTrendsWeather />
                    </div>
                </div>
            )}
        </GetUsersApiComponent>
    )
}

export function TimelineTrendsWrapper({ users }: { users: GroupUser[] }) {

    const [dates, setDates] = useState({ from: "1970-01-01", to: "1970-01-01" })

    let component = null
    if (dates.from == "1970-01-01") {
        component = <div className="flex" style={{ height: getGroupTimelineHeight(users) }}>
            <LoadScreen />
        </div>
    } else {
        component = <GroupTimelineTrends users={users} from={dates.from} to={dates.to} />
    }

    const buttonClicked = (from: string, to: string) => {
        setDates({ from, to })
    }

    return (
        <div className="card">
            <div className="horizontal justify-between items-center mb-4">
                <h2>Presence</h2>
                <div className="flex-1" />
                <TimeRangeSelector onRangeSelected={buttonClicked} />
            </div>
            {component}
        </div >
    )
}
