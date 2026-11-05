import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBug,
  faHandSparkles,
} from "@fortawesome/free-solid-svg-icons";

export type ChangelogType = "feature" | "bugfix" | "enrichment";

export interface ChangelogItem {
  type: ChangelogType;
  key: string;
}

const typeConfig = {
  feature: { icon: faPlus, className: "text-green" },
  bugfix: { icon: faBug, className: "text-red" },
  enrichment: { icon: faHandSparkles, className: "text-yellow" },
} as const;

const typeOrder: ChangelogType[] = ["feature", "enrichment", "bugfix"];

export default function ChangelogList({
  prefix,
  items,
}: {
  prefix: string;
  items: ChangelogItem[];
}) {
  const { t } = useTranslation();

  const groups = typeOrder
    .map((type) => items.filter((item) => item.type === type))
    .filter((group) => group.length > 0);

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <ul key={group[0].type} className="space-y-1">
          {group.map(({ type, key }) => {
            const { icon, className } = typeConfig[type];
            return (
              <li key={key} className="flex items-start gap-2">
                <FontAwesomeIcon icon={icon} className={`mt-1 ${className}`} />
                <span>{t(`${prefix}.${key}`)}</span>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}
