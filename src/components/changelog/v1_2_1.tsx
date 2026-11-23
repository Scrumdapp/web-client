import ChangelogList, { ChangelogItem } from "./ChangeLogList.tsx";
import { useTranslation } from "react-i18next";

const items: ChangelogItem[] = [
  { type: "enrichment", key: "betterSecurity" },
  { type: "enrichment", key: "uiChanges" },
  { type: "bugfix", key: "betterModal" },
  { type: "bugfix", key: "minorBugs" },
];

export default function ChangelogV1_2_1() {
  const { t } = useTranslation();
  return (
    <div className="my-4">
      <h2 className="my-4">V1.2.1 ({t("date.mon")} 2026-11-23) </h2>
      <ChangelogList prefix="changelogs.v1_2_1" items={items} />
    </div>
  );
}
