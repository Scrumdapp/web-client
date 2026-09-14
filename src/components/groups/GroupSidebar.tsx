import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { useGroup } from "../../js/context/group/useGroup.ts";
import { Link } from "react-router"
import { faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function GroupSidebar() {
    const group = useGroup();

    return (
        <div className="card vertical gap-1">
            <SidebarLink to={`/groups/${group.id}`}
                translationKey="checkpoint.sidebar.today"
                icon={faHouse}
                className="text-blue"
            />
            <hr className="text-gray" />
            <SidebarLink to={`/groups/${group.id}/calendar`}
                translationKey="checkpoint.sidebar.calendar"
                icon={faCalendarDays}
                className="text-green"
            />
            <SidebarLink to={`/groups/${group.id}/trends`}
                translationKey="checkpoint.sidebar.trends"
                icon={faGear}
                className="text-yellow"
            />
            <SidebarLink to={`/groups/${group.id}/settings`}
                translationKey="checkpoint.sidebar.settings"
                icon={faGear}
                className="text-red"
            />
        </div>
    )
}


function SidebarLink(
    { to, translationKey, icon, className }: { to: string, translationKey: string, icon: IconProp, className: string }
) {
    const { t } = useTranslation();

    return (
        <Link to={to} className="btn justify-start">
            <FontAwesomeIcon icon={icon} className={className} />
            {t(translationKey)}
        </Link>
    )
}
