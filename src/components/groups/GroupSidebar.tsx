import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { useGroup } from "../../js/context/group/useGroup.ts";
import { Link } from "react-router"
import { faChartSimple, faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { ShowIf } from "../utility/Conditional.tsx";
import { useUser } from "../../js/context/user/useUser.ts";
import { hasRole, Role } from "../../js/utils/userPermissions.ts";

export function GroupSidebar() {
    const { t } = useTranslation();
    const group = useGroup();
    const user = useUser();

    return (
        <div className="card vertical gap-1">
            <Link to={`/groups/${group.id}`} className="btn justify-start!">
                <FontAwesomeIcon icon={faHouse} className="text-blue" /> {t("checkpoint.sidebar.today")}
            </Link>
            <hr className="text-gray" />

            <Link to={`/groups/${group.id}/calendar`} className="btn">
                <FontAwesomeIcon icon={faCalendarDays} className="text-green" />
                {t("checkpoint.sidebar.calendar")}
            </Link>
            <Link to={`/groups/${group.id}/trends`} className="btn">
                <FontAwesomeIcon icon={faChartSimple} className="text-yellow" />
                {t("checkpoint.sidebar.trends")}
            </Link>
            <ShowIf condition={hasRole(user, Role.Coach)}>
                <Link to={`/groups/${group.id}/settings`} className="btn">
                    <FontAwesomeIcon icon={faGear} className="text-red" />
                    {t("checkpoint.sidebar.settings")}
                </Link>
            </ShowIf>
        </div>
    )
}
