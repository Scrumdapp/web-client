import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function SidebarLink({
  to,
  labelKey,
  icon,
  color,
  end,
  onClick,
}: {
  to: string;
  labelKey: string;
  icon: IconProp;
  color: string;
  end?: boolean;
  onClick?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `btn justify-start${isActive ? " bg-bg2" : ""}`
      }
    >
      <FontAwesomeIcon icon={icon} className={color} />
      {t(labelKey)}
    </NavLink>
  );
}
