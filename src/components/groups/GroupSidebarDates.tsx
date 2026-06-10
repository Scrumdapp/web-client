import { Link } from "react-router-dom";
import { useGroup } from "../../js/context/group/useGroup"
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi"
import { useApiComponent } from "../../js/hooks/api/useApiComponent"

export function GroupSidebarDates() {

    const group = useGroup();
    const GetDatesApiComponent = useApiComponent(ScrumdappApi.getRecentCheckpointDates())

    return (
        <div className="card vertical gap-1 text-center">
            <span>Recent</span>
            <hr className="text-gray my-2" />
            <GetDatesApiComponent input={[group.id, 5]}>
                {(dates) => dates.dates.map((date) => (
                    <Link key={date.date} to={`/groups/${group.id}?date=${date.date}`} className="btn text-gray! py-1!">
                        {date.date}
                    </Link>
                ))}
            </GetDatesApiComponent >
        </div>
    )
}
