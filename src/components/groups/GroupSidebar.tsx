import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faCalendarDays} from "@fortawesome/free-regular-svg-icons";
import {useGroup} from "../../js/context/group/useGroup.ts";
import {Link} from "react-router"
import {faChartSimple, faGear} from "@fortawesome/free-solid-svg-icons";


export function GroupSidebar() {
    const group = useGroup()

    return (
        <div className="card vertical gap-2">
            <p className="text-center">Pages</p>
            <hr className="text-gray" />
            <Link to={`/groups/${group.id}/calendar`} className="btn justify-start!">
                <FontAwesomeIcon icon={faCalendarDays} className="text-green" />
                Calendar
            </Link>
            <Link to={`/groups/${group.id}/trends`} className="btn justify-start!">
                <FontAwesomeIcon icon={faChartSimple} className="text-yellow" />
                Trends
            </Link>
            <Link to={`/groups/${group.id}/settings`} className="btn justify-start!">
                <FontAwesomeIcon icon={faGear} className="text-red" />
                Settings
            </Link>
        </div>
    )
}