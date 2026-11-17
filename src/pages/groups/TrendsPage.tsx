import { useState } from "react";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { TimeRangeSelector } from "../../components/groups/trends/TimeRangeSelector.tsx";
import {
  getGroupTimelineHeight,
  GroupTimelineDisplayType,
  GroupTimelineTrends,
} from "../../components/groups/trends/timeline/GroupTimelineTrends.tsx";
import { TimelineSelector } from "../../components/groups/trends/timeline/TimelineSelector.tsx";
import { useTranslation } from "react-i18next";
import { useGroupUsers } from "../../utility/groupUsers/useGroupUsers.ts";

export function TrendsPage() {
  const { t } = useTranslation();

  return (
    <div className="vertical gap-4">
      <div className="card">
        <h2>{t("trends.trends")}</h2>
      </div>
      <div className="card md:hidden">
        <h3>{t("trends.mobileview")}</h3>
      </div>
      <TimelineTrendsWrapper />
    </div>
  );
}

export function TimelineTrendsWrapper() {
  const { t } = useTranslation();
  const users = useGroupUsers({ ignoreGhosts: true })

  const [dates, setDates] = useState({ from: "1970-01-01", to: "1970-01-01" });
  const [displayType, setDisplayType] = useState(
    GroupTimelineDisplayType.Periodic,
  );

  const rangeSelected = (from: string, to: string) => {
    setDates({ from, to });
  };

  const displaySelected = (type: GroupTimelineDisplayType) => {
    setDisplayType(type);
  };

  let component = null;
  if (dates.from == "1970-01-01" || dates.to == "1970-01-01") {
    component = (
      <div className="flex" style={{ height: getGroupTimelineHeight(users) }}>
        <LoadScreen />
      </div>
    );
  } else {
    component = (
      <GroupTimelineTrends
        users={users}
        from={dates.from}
        to={dates.to}
        display={displayType}
      />
    );
  }

  return (
    <div className="card">
      <title>{t("trends.title")}</title>
      <div className="horizontal justify-between gap-2 items-center mb-4">
        <h2>{t("trends.header")}</h2>
        <div className="flex-1" />
        <TimelineSelector onRangeSelected={displaySelected} />
        <TimeRangeSelector onRangeSelected={rangeSelected} />
      </div>
      {component}
    </div>
  );
}
