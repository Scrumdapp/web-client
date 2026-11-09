import ChangelogList, { ChangelogItem } from "./ChangeLogList.tsx";
import { useTranslation } from "react-i18next";

const items: ChangelogItem[] = [
  { type: "feature", key: "newFeature" },
  { type: "enrichment", key: "betterSomething" },
  { type: "bugfix", key: "fixBug" },
];

// CHANGE THE NUMBERS FOR THE NEW VERSION !!!
// DON'T FORGET TO ADD ALL THE CHANGES TO changelog.ts !!!
// DON'T FORGET TO ADD THE NEW VERSION TO changelogLogic.ts !!!

export default function ChangelogV100() {
  const { t } = useTranslation();
  return (
    <div className="my-4">
      <h2 className="my-4">V1.0 ({t("date.sun")} 2000-01-01) </h2>
      <ChangelogList prefix="changelogs.v1_0" items={items} />
    </div>
  );
}
