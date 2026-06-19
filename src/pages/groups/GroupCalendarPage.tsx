import { Calendar } from "../../components/groups/calendar/Calendar"
import { getYearMonth } from "../../js/utils/timeUtils"


export function GroupCalendarPage() {

    const yearMonth = getYearMonth(new Date())

    return (
        <div className="card">
            <Calendar yearMonth={yearMonth} />
        </div>
    )

}
