import { useGroup } from "../../../js/context/group/useGroup"
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi"
import { useApiComponent } from "../../../js/hooks/api/useApiComponent"
import { firstDayOfMonth, getWeekEnd, getWeekNumber, getWeeksBetween, getWeekStart, lastDayOfMonth, parseYearMonth, WEEK } from "../../../js/utils/timeUtils"
import { memo } from "react"
import { CalendarDate } from "./CalendarDate"
import { useTranslation } from "react-i18next";

export interface CalendarProps {
    yearMonth: string
}

export const Calendar = memo(({ yearMonth }: CalendarProps) => {
    const {t} = useTranslation()
    const group = useGroup()
    const GetCalendarDatesComponent = useApiComponent(ScrumdappApi.getCheckpointDatesInMonth())

    const yearMonthDate = parseYearMonth(yearMonth)
    const monthStart = firstDayOfMonth(yearMonthDate)
    const firstDay = getWeekStart(firstDayOfMonth(monthStart))
    const lastDay = getWeekEnd(lastDayOfMonth(yearMonthDate))
    const weekCount = getWeeksBetween(firstDay, lastDay)

    return (
        <GetCalendarDatesComponent input={[group.id, yearMonth]}>
            {(dates) => (
                <table className="calendar-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{t("calendar.mon")}</th>
                            <th>{t("calendar.tue")}</th>
                            <th>{t("calendar.wed")}</th>
                            <th>{t("calendar.thu")}</th>
                            <th>{t("calendar.fri")}</th>
                            <th>{t("calendar.sat")}</th>
                            <th>{t("calendar.sun")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: weekCount }).map((_, w) => new Date(firstDay.getTime() + w * WEEK)).map((weekStart) => (
                            <tr key={weekStart.getTime()}>
                                <td className="text-gray max-w-6">W{getWeekNumber(weekStart)}</td>
                                <CalendarDate weekStart={weekStart} offsetDays={0} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                <CalendarDate weekStart={weekStart} offsetDays={1} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                <CalendarDate weekStart={weekStart} offsetDays={2} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                <CalendarDate weekStart={weekStart} offsetDays={3} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                <CalendarDate weekStart={weekStart} offsetDays={4} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                <CalendarDate weekStart={weekStart} offsetDays={5} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                <CalendarDate weekStart={weekStart} offsetDays={6} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </GetCalendarDatesComponent>
    )
})

