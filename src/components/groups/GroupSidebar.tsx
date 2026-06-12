import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays} from "@fortawesome/free-regular-svg-icons";
import {useGroup} from "../../js/context/group/useGroup.ts";
import {Link} from "react-router"
import {faChartSimple, faGear, faHouse} from "@fortawesome/free-solid-svg-icons";

const links = [
    { path: "calendar", icon: faCalendarDays, color: "text-green", text: "Calendar" },
    { path: "trends", icon: faChartSimple, color: "text-yellow", text: "Trends" },
    { path: "settings", icon: faGear, color: "text-red", text: "Settings" },
]


export function GroupSidebar() {
    const group = useGroup()

    return (
        <div className="card vertical gap-1">
            <Link to={`/groups/${group.id}`} className="btn justify-start!">
                <FontAwesomeIcon icon={faHouse} className="text-blue"/> Today
            </Link>
            <hr className="text-gray" />
            {links.map((link, i) => (
                <Link key={i} to={`/groups/${group.id}/${link.path}`} className="btn justify-start!">
                    <FontAwesomeIcon icon={link.icon} className={link.color} />
                    {link.text}
                </Link>
            ))}
        </div>
    )
}