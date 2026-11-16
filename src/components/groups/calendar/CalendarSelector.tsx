import { memo } from "react";
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi";
import { useApiComponent } from "../../../js/hooks/api/useApiComponent";
import { useGroup } from "../../../js/context/group/useGroup";
import { Link, useNavigate } from "react-router-dom";
import {
  getYearMonth,
  nextMonth,
  parseMonthText,
  parseYearMonth,
  previousMonth,
} from "../../../js/utils/timeUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Select } from "../../generic/Select";

export const CalendarSelector = memo(
  ({ currentYearMonth }: { currentYearMonth: string }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const ym = parseYearMonth(currentYearMonth);
    const group = useGroup();
    const GetMonthsComponent = useApiComponent(
      ScrumdappApi.getCheckpointMonths(),
    );

    const monthLabel = (date: Date) => {
      const key = parseMonthText(date.getUTCMonth());
      return key ? t(key) : "";
    };

    const goToMonth = (month: string | null) => {
      if (month != null) {
        navigate(`/groups/${group.id}/calendar?month=${month}`);
      }
    };

    return (
      <div className="horizontal">
        <GetMonthsComponent input={[group.id]}>
          {(months) => (
            <>
              <div className="flex-1 flex justify-start ">
                {months.some((it) => it == getYearMonth(previousMonth(ym))) ? (
                  <Link
                    className="btn"
                    to={`/groups/${group.id}/calendar?month=${getYearMonth(previousMonth(ym))}`}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-blue" />
                    {monthLabel(previousMonth(ym))}
                  </Link>
                ) : (
                  <span className="btn pointer-events-none text-gray!">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    {monthLabel(previousMonth(ym))}
                  </span>
                )}
              </div>

              <div className="flex-1 flex justify-center items-center">
                <Select
                  label={t("calendar.month")}
                  hideLabel
                  value={currentYearMonth}
                  onChange={goToMonth}
                  buttonContent={<span>{monthLabel(ym)}</span>}
                  options={months.map((m) => ({
                    value: m,
                    label: monthLabel(parseYearMonth(m)),
                  }))}
                />
              </div>

              <div className="flex-1 flex justify-end">
                {months.some((it) => it == getYearMonth(nextMonth(ym))) ? (
                  <Link
                    className="btn"
                    to={`/groups/${group.id}/calendar?month=${getYearMonth(nextMonth(ym))}`}
                  >
                    {monthLabel(nextMonth(ym))}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-blue"
                    />
                  </Link>
                ) : (
                  <span className="btn pointer-events-none text-gray!">
                    {monthLabel(nextMonth(ym))}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                )}
              </div>
            </>
          )}
        </GetMonthsComponent>
      </div>
    );
  },
);
