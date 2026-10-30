import { useSearchParams } from "react-router-dom";
import { Calendar } from "../../components/groups/calendar/Calendar";
import { CalendarSelector } from "../../components/groups/calendar/CalendarSelector";
import { getYearMonth, isYearMonth } from "../../js/utils/timeUtils";
import { useTranslation } from "react-i18next";

export function GroupCalendarPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const ymParam = searchParams.get("month") ?? "";
  const yearMonth = isYearMonth(ymParam) ? ymParam : getYearMonth(new Date());

  return (
    <>
      <title>{t("calendar.title")}</title>
      <div className="card p-1 md:p-4">
        <CalendarSelector currentYearMonth={yearMonth} />
        <div className="h-fit py-1 md:min-h-60 md:py-0">
          <Calendar yearMonth={yearMonth} />
        </div>
      </div>
    </>
  );
}
