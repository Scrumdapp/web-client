import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { useGroup } from "../../js/context/group/useGroup.ts";
import { Link } from "react-router";
import {
  faChartSimple,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function GroupSidebarMobile({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const group = useGroup();

  return (
    <div className="vertical gap-1">
      <SidebarLink
        to={`/groups/${group.id}`}
        translationKey="checkpoint.sidebar.today"
        icon={faHouse}
        className="text-blue"
        onClick={onNavigate}
      />
      <hr className="text-gray" />
      <SidebarLink
        to={`/groups/${group.id}/calendar`}
        translationKey="checkpoint.sidebar.calendar"
        icon={faCalendarDays}
        className="text-green"
        onClick={onNavigate}
      />
      <SidebarLink
        to={`/groups/${group.id}/trends`}
        translationKey="checkpoint.sidebar.trends"
        icon={faChartSimple}
        className="text-yellow"
        onClick={onNavigate}
      />
      <SidebarLink
        to={`/groups/${group.id}/settings`}
        translationKey="checkpoint.sidebar.settings"
        icon={faGear}
        className="text-red"
        onClick={onNavigate}
      />
    </div>
  );
}

function SidebarLink({
  to,
  translationKey,
  icon,
  className,
  onClick,
}: {
  to: string;
  translationKey: string;
  icon: IconProp;
  className: string;
  onClick?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Link to={to} className="btn justify-start" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={className} />
      {t(translationKey)}
    </Link>
  );
}
