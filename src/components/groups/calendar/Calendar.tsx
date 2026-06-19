import { Link } from "react-router-dom"
import { useGroup } from "../../../js/context/group/useGroup"
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi"
import { useApiComponent } from "../../../js/hooks/api/useApiComponent"
import { SessionDates } from "../../../js/models/checkpoint"
import { toScrumdappDate } from "../../../js/utils/scrumdappDate"
import { DAY, firstDayOfMonth, getWeekEnd, getWeeksBetween, getWeekStart, getYearMonth, lastDayOfMonth, parseYearMonth, WEEK } from "../../../js/utils/timeUtils"
import { memo } from "react"

export interface CalendarProps {
    yearMonth: string
}

export const Calendar = memo(({ yearMonth }: CalendarProps) => {

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
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: weekCount }).map((_, w) => new Date(firstDay.getTime() + w * WEEK)).map((weekStart) => (
                                <tr key={weekStart.getTime()}>
                                    <DisplayDate weekStart={weekStart} offsetDays={0} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                    <DisplayDate weekStart={weekStart} offsetDays={1} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                    <DisplayDate weekStart={weekStart} offsetDays={2} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                    <DisplayDate weekStart={weekStart} offsetDays={3} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                    <DisplayDate weekStart={weekStart} offsetDays={4} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                    <DisplayDate weekStart={weekStart} offsetDays={5} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                    <DisplayDate weekStart={weekStart} offsetDays={6} yearMonth={yearMonth} groupId={group.id} dates={dates} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </GetCalendarDatesComponent>
            )
})

            export function DisplayDate({weekStart, offsetDays, yearMonth, groupId, dates}: {weekStart: Date, offsetDays: number, yearMonth: string, groupId: number, dates: SessionDates }) {

    const myDate = new Date(weekStart.getTime() + offsetDays * DAY)
            const myScrumdappDate = toScrumdappDate(myDate)
    const hasCheckpoint = dates.dates.find(it => myScrumdappDate == it.date) != null
    const isWeekendDay = offsetDays >= 5
            const isDateInMonth = getYearMonth(myDate) == yearMonth
            const isToday = toScrumdappDate(new Date()) == myScrumdappDate

            return (
            <td
                className={`${isDateInMonth ? "" : "outside-month"}`}
            >
                <Link
                    className={`${hasCheckpoint ? "highlight" : ""} ${isWeekendDay ? "weekend-day" : ""} ${isToday ? "today" : ""}`}
                    to={`/groups/${groupId}?date=${myScrumdappDate}`}
                >
                    {myDate.getUTCDate()}
                </Link>
            </td>
            )
}
