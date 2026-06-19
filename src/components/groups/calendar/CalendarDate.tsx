import { Link } from "react-router-dom"
import { SessionDates } from "../../../js/models/checkpoint"
import { toScrumdappDate } from "../../../js/utils/scrumdappDate"
import { DAY, getYearMonth } from "../../../js/utils/timeUtils"
import { memo, useEffect, useState } from "react"
import { useApi } from "../../../js/hooks/api/useApi"
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi"
import { LoadScreen } from "../../generic/LoadScreen"

export function CalendarDate({ weekStart, offsetDays, yearMonth, groupId, dates }: { weekStart: Date, offsetDays: number, yearMonth: string, groupId: number, dates: SessionDates }) {

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
                className={`dropdown ${hasCheckpoint ? "highlight" : ""} ${isWeekendDay ? "weekend-day" : ""} ${isToday ? "today" : ""}`}
                to={`/groups/${groupId}?date=${myScrumdappDate}`}
            >
                {myDate.getUTCDate()}
                {hasCheckpoint && <DateDropdownContent groupId={groupId} date={myScrumdappDate} />}
            </Link>
        </td>
    )
}

const DateDropdownContent = memo(({ groupId, date }: { groupId: number, date: string }) => {

    const [mouseOver, setMouseOver] = useState(false)
    const getCheckpointSessions = useApi(ScrumdappApi.getCheckpointSessions())

    const tryLoadData = () => {
        console.log("Loading")
        if (getCheckpointSessions.data != null || getCheckpointSessions.loading == true) {
            return
        }

        console.log("Trying")
        getCheckpointSessions.runCommand(groupId, { date })
    }

    useEffect(() => {
        if (!mouseOver) return
        console.log("enter")
        const id = setTimeout(() => tryLoadData(), 500)
        return () => clearTimeout(id)
    }, [mouseOver])


    return (
        <div
            className="dropdown-content"
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            {getCheckpointSessions.data == null || getCheckpointSessions.loading == true ? (
                <LoadScreen />
            ) : (
                <div className="vertical gap-2">
                    {getCheckpointSessions.data.map(it => (
                        <div key={it.id}>
                            {it.name}
                        </div>))}
                </div>
            )}
        </div>
    )
})
