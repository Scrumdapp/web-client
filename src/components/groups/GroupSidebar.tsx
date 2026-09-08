import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { useGroup } from "../../js/context/group/useGroup.ts";
import { Link } from "react-router"
import { faChartSimple, faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export function GroupSidebar() {
    const { t } = useTranslation();
    const group = useGroup()

    const links = [
        { path: "calendar", icon: faCalendarDays, color: "text-green", text: t("checkpoint.sidebar.calendar") },
        { path: "trends", icon: faChartSimple, color: "text-yellow", text: t("checkpoint.sidebar.trends") },
        { path: "settings", icon: faGear, color: "text-red", text: t("checkpoint.sidebar.settings") },
    ]

    return (
        <div className="card vertical gap-1">
            <Link to={`/groups/${group.id}`} className="btn justify-start!">
                <FontAwesomeIcon icon={faHouse} className="text-blue"/> {t("checkpoint.sidebar.today")}
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