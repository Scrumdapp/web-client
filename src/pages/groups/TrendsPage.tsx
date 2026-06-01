import { GroupTimelineTrends } from "../../components/groups/trends/GroupTimelineTrends"
import { useGroup } from "../../js/context/group/useGroup"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi"
import { useApiComponent } from "../../js/hooks/api/useApiComponent"
import {GroupTimelineTrendsWeather} from "../../components/groups/trends/GroupTimelineTrendsWeather.tsx";

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
                    <div className="card">
                        <h2>Presence</h2>
                        <GroupTimelineTrends users={users} />
                    </div>
                    <div className="card">
                        <h2>Weather</h2>
                        <GroupTimelineTrendsWeather />
                    </div>
                </div>
            )}
        </GetUsersApiComponent>
    )
}
