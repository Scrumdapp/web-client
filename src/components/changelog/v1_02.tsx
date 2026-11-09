import ChangelogList, { ChangelogItem } from "./ChangeLogList.tsx";
import { useTranslation } from "react-i18next";

const items: ChangelogItem[] = [
  { type: "feature", key: "mobileView" },
  { type: "feature", key: "changeLog" },
  { type: "feature", key: "checkpointNames" },
  { type: "feature", key: "groupUserManagement" },
  { type: "enrichment", key: "errorHandling" },
  { type: "enrichment", key: "uiChanges" },
  { type: "bugfix", key: "removedCommas" },
  { type: "bugfix", key: "minorBugs" },
];

export default function ChangelogV102() {
  const { t } = useTranslation();
  return (
    <div className="my-4">
      <h2 className="my-4">V1.02 ({t("date.mon")} 2026-11-09) </h2>
      <ChangelogList prefix="changelogs.v1_02" items={items} />
    </div>
  );
}
