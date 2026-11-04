import ChangelogList, { ChangelogItem } from "./ChangeLogList.tsx";

const items: ChangelogItem[] = [{ type: "feature", key: "mobileView" }];

export default function ChangelogV102() {
  return (
    <div className="my-4">
      <h2 className="mb-2">V1.02</h2>
      <ChangelogList prefix="changelogs.v1_02" items={items} />
    </div>
  );
}
