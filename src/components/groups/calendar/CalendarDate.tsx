import { Link } from "react-router-dom";
import { SessionDates } from "../../../js/models/checkpoint";
import { toScrumdappDate } from "../../../js/utils/scrumdappDate";
import { DAY, getYearMonth, isDateInFuture } from "../../../js/utils/timeUtils";
import { useTranslation } from "react-i18next";

export function CalendarDate({
  weekStart,
  offsetDays,
  yearMonth,
  groupId,
  dates,
}: {
  weekStart: Date;
  offsetDays: number;
  yearMonth: string;
  groupId: number;
  dates: SessionDates;
}) {
  const { t, i18n } = useTranslation();
  const myDate = new Date(weekStart.getTime() + offsetDays * DAY);
  const myScrumdappDate = toScrumdappDate(myDate);
  const hasCheckpoint =
    dates.dates.find((it) => myScrumdappDate == it.date) != null;
  const isWeekendDay = offsetDays >= 5;
  const isDateInMonth = getYearMonth(myDate) == yearMonth;
  const isToday = toScrumdappDate(new Date()) == myScrumdappDate;
  const isFuture = isDateInFuture(myDate);
  const accessibleDate = new Intl.DateTimeFormat(
    i18n.resolvedLanguage ?? "en",
    { dateStyle: "full", timeZone: "UTC" },
  ).format(myDate);
  const dateLabel = [
    accessibleDate,
    hasCheckpoint ? t("a11y.calendar.hasCheckpoint") : "",
    isToday ? t("a11y.calendar.today") : "",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <td className={`${isDateInMonth ? "" : "outside-month"}`}>
      {isFuture ? (
        <div className={`dropdown ${isWeekendDay ? "weekend-day" : ""}`}>
          <time dateTime={myScrumdappDate} aria-label={dateLabel}>
            {myDate.getUTCDate()}
          </time>
        </div>
      ) : (
        <Link
          aria-label={dateLabel}
          aria-current={isToday ? "date" : undefined}
          className={`dropdown ${hasCheckpoint ? "highlight" : ""} ${isWeekendDay ? "weekend-day" : ""} ${isToday ? "today" : ""}`}
          to={`/groups/${groupId}?date=${myScrumdappDate}`}
        >
          <time dateTime={myScrumdappDate}>{myDate.getUTCDate()}</time>
        </Link>
      )}
    </td>
  );
}
