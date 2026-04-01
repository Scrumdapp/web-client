import {useGroup} from "../../js/context/group/useGroup.ts";
import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import {ScrummasterCheckinsTable} from "../../components/checkins/ScrummasterCheckins.tsx";

export function ScrummasterCheckinPage() {
    const group = useGroup()

    const [ searchParams ] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date())

    return (
        <ScrummasterCheckinsTable
            groupId={group.id}
            date={date}
        />
    )
}