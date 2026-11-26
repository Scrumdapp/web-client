import { Link } from "react-router-dom";
import {
  parseScrumdappDate,
  toScrumdappDate,
} from "../../js/utils/scrumdappDate.ts";
import {
  faArrowsRotate,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { ErrorScreen } from "../../components/generic/ErrorScreen.tsx";
import { parseWeekDay, parseWeekDayMobile } from "../../js/utils/timeUtils.ts";
import { Tribe } from "../../js/models/tribe.ts";
import { useTranslation } from "react-i18next";
import TribeCheckpoint from "../../components/tribes/TribeCheckpoint.tsx";
import { AttendanceLegend } from "../../components/generic/AttendanceComponents.tsx";
import { ShowIf } from "../../components/utility/Conditional.tsx";

export function TribeCheckpointPage({
  tribe,
  date,
  currentDate,
}: {
  tribe: Tribe;
  date: string;
  currentDate: string;
}) {
  const { t } = useTranslation();

  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  const prevDate = toScrumdappDate(prev);

  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  const nextDate = toScrumdappDate(next);

  const getTribeCheckpoints = useApi(ScrumdappApi.getTribeCheckpoints(), {
    fetchOnCreated: [tribe.id, date],
  });

  if (getTribeCheckpoints.error != null) {
    return <ErrorScreen error={getTribeCheckpoints.error} />;
  }

  const checkpointSessions = getTribeCheckpoints.data!;

  return (
    <div className="space-y-3">
      <title>{tribe.name ? `${tribe.name} | Scrumdapp` : "Scrumdapp"}</title>
      <div className="flex justify-between card w-full md:h-20 bg-bg_h border rounded-lg p-1 md:p-2 items-center">
        <div className="horizontal items-center">
          <Link to={`/tribes/${tribe.id}?date=${prevDate}`} className="btn">
            <FontAwesomeIcon icon={faChevronDown} className="rotate-90" />
          </Link>
          <h2 className="text-xl md:text-2xl w-fit md:w-3xs flex justify-center px-0 md:px-2">
            <span className="md:hidden">
              {t(parseWeekDayMobile(parseScrumdappDate(date).getUTCDay()))}
            </span>
            <span className="hidden md:inline">
              {t(parseWeekDay(parseScrumdappDate(date).getUTCDay()))}
            </span>
            &nbsp;{date}
          </h2>
          <Link
            to={`/tribes/${tribe.id}?date=${nextDate}`}
            className={`btn ${date === currentDate ? "opacity-50 pointer-events-none" : ""}`}
            aria-disabled={date === currentDate}
            tabIndex={date === currentDate ? -1 : undefined}
            onClick={(e) => {
              if (date === currentDate) e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} className="rotate-270" />
          </Link>
        </div>
        <ShowIf condition={currentDate === date}>
          <div className="flex items-center gap-3">
            <button
              className="btn border disabled:cursor-not-allowed"
              onClick={() =>
                getTribeCheckpoints
                  .runCommand(tribe.id, date)
                  .catch(console.error)
              }
              disabled={getTribeCheckpoints.loading}
            >
              <FontAwesomeIcon icon={faArrowsRotate} className="text-blue" />{" "}
              {t("checkpoint.refresh")}
            </button>
          </div>
        </ShowIf>
      </div>
      {getTribeCheckpoints.loading ? (
        <div>
          <LoadScreen />
        </div>
      ) : checkpointSessions?.length > 0 ? (
        <>
          {checkpointSessions.map((session, index) => (
            <div key={session.session_name} className="w-full">
              <TribeCheckpoint
                tribe={tribe}
                session={session}
                groupCount={tribe.group_count}
                userCount={tribe.user_count}
                isMostRecent={index === 0}
              />
            </div>
          ))}
          <AttendanceLegend />
        </>
      ) : currentDate == date ? (
        <div className="py-4 flex flex-col items-center text-center justify-center gap-2">
          <h2>{t("checkpoint.nocheckpoint.today")}</h2>
          <p className="text-center">
            {t("checkpoint.nocheckpoint.todaydescription")}
          </p>
        </div>
      ) : (
        <div className="py-4 flex flex-col items-center text-center justify-center gap-2">
          <h2>{t("checkpoint.nocheckpoint.past")}</h2>
          <p className="text-center">
            {t("checkpoint.nocheckpoint.pastdescription")}
          </p>
        </div>
      )}
    </div>
  );
}
