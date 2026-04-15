import {useGroup} from "../../js/context/group/useGroup.ts";
import Checkin from "../../components/checkins/Checkin.tsx";
import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";

export function GroupCheckinPage() {
    const group = useGroup()

    const [ searchParams ] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date())

    return (
        <div className="space-y-3 ">
        <div className="card w-7/10 h-15 bg-bg_h border rounded-lg p-2">
            <h2 className="text-left px-2">Checkpoint {date}</h2>
        </div>
        <Checkin groupId={group.id} date={date} />
        </div>
    )

}