import {useGroup} from "../../js/context/group/useGroup.ts";
import Checkin from "../../components/checkins/Checkin.tsx";
import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";

export function GroupCheckinPage() {
    const group = useGroup()

    const [ searchParams ] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date())

    return (
        <Checkin groupId={group.id} date={date} />
    )
}