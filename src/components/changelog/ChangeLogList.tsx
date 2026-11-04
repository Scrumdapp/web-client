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
  feature: { icon: faPlus, className: "text-green-600" },
  bugfix: { icon: faBug, className: "text-red-600" },
  enrichment: { icon: faHandSparkles, className: "text-yellow-500" },
} as const;

export default function ChangelogList({
  prefix,
  items,
}: {
  prefix: string;
  items: ChangelogItem[];
}) {
  const { t } = useTranslation();

  return (
    <ul className="space-y-1">
      {items.map(({ type, key }) => {
        const { icon, className } = typeConfig[type];
        return (
          <li key={key} className="flex items-start gap-2">
            <FontAwesomeIcon icon={icon} className={`mt-1 ${className}`} />
            <span>{t(`${prefix}.${key}`)}</span>
          </li>
        );
      })}
    </ul>
  );
}
