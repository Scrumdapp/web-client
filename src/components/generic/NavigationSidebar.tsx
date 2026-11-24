import { SidebarLink } from "./navigation/SidebarLink";
import { SidebarScope, SIDEBAR_LINKS } from "../../constants/navigation";
import { Fragment } from "react/jsx-runtime";
import { cn } from "../../js/utils/tw";

export function NavigationSidebar({
  scope,
  basePath,
  onNavigate,
  className = "",
}: {
  scope: SidebarScope;
  basePath: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const links = SIDEBAR_LINKS.filter(
    (link) => !link.scopes || link.scopes.includes(scope),
  );

  return (
    <div className={cn("vertical gap-1", className)}>
      {links.map((link) => (
        <Fragment key={link.path}>
          <SidebarLink
            to={`${basePath}${link.path}`}
            labelKey={link.labelKey}
            icon={link.icon}
            color={link.color}
            end={link.end}
            onClick={onNavigate}
          />
          {link.dividerAfter && <hr className="text-gray" />}
        </Fragment>
      ))}
    </div>
  );
}
