import { useSearchParams } from "react-router-dom"
import { Calendar } from "../../components/groups/calendar/Calendar"
import { CalendarSelector } from "../../components/groups/calendar/CalendarSelector"
import { getYearMonth, isYearMonth } from "../../js/utils/timeUtils"

export function GroupCalendarPage() {

    const [searchParams] = useSearchParams()
    const ymParam = searchParams.get("month") ?? ""
    const yearMonth = isYearMonth(ymParam) ? ymParam : getYearMonth(new Date())

    return (<>
        <title>Calendar | Scrumdapp</title>
        <div className="card">
            <CalendarSelector currentYearMonth={yearMonth} />
            <div className="max-h-70 flex">
                <Calendar yearMonth={yearMonth} />
            </div>
        </div>
    </>)
}