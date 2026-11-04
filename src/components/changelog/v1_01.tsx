import ChangelogList, { ChangelogItem } from "./ChangeLogList.tsx";

const items: ChangelogItem[] = [
  { type: "feature", key: "newStars" },
  { type: "feature", key: "newTime" },
  { type: "feature", key: "groupBackgrounds" },
  { type: "enrichment", key: "uiChanges" },
  { type: "enrichment", key: "betterInvites" },
  { type: "enrichment", key: "landingPage" },
  { type: "enrichment", key: "sessionLoss" },
  { type: "enrichment", key: "databaseQueries" },
  { type: "bugfix", key: "minorBugs" },
];

export default function ChangelogV101() {
  return (
    <div className="my-4">
      <h2 className="mb-2">V1.01</h2>
      <ChangelogList prefix="changelogs.v1_01" items={items} />
    </div>
  );
}
