import {useGroup} from "../../js/context/group/useGroup.ts";
import {Link} from "react-router";

export function GroupSidebarDates() {
    const group = useGroup()

    return (
        <div className="card vertical gap-1">
            <Link to={`/groups/${group.id}`} className="btn py-1!">
                Today
            </Link>
            <hr className="text-gray"/>
        </div>
    )
}