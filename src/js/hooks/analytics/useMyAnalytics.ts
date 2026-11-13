import { useState } from "react"
import { ScrumdappApi } from "../api/scrumdappApi.ts"
import { useApi } from "../api/useApi.ts"
import {
    getSchoolYearRange,
    getSemesterStart,
    rangeToQuery,
    shiftYearMonth,
    toCalendarView,
    toMoodTrend,
    toPeriodBars,
    toSummaryView,
} from "../../utils/analyticsUtils.ts"
import { toScrumdappDate } from "../../utils/scrumdappDate.ts"
import { getYearMonth } from "../../utils/timeUtils.ts"

/** Fetches again; the error is already stored by useApi, so the rejection is ignored. */
function retryWith(request: () => Promise<unknown>) {
    return () => { request().catch(() => {}) }
}

export function useTrendSummary(groupId: number) {
    const { data, error, runCommand } = useApi(ScrumdappApi.getUserTrendSummary(), {
        mapper: toSummaryView,
        fetchOnCreated: [groupId, "@me"],
    })
    return { data, error, retry: retryWith(() => runCommand(groupId, "@me")) }
}

export function useAttendanceMonth(groupId: number, yearMonth: string) {
    const { data, error, runCommand } = useApi(ScrumdappApi.getUserTrendCalendar(), {
        mapper: toCalendarView,
        fetchOnCreated: [groupId, "@me", yearMonth],
    })
    return { data, error, retry: retryWith(() => runCommand(groupId, "@me", yearMonth)) }
}

/** Star scores of the current school year. */
export function useMoodTrend(groupId: number) {
    const [fromDate, toDate] = rangeToQuery(getSchoolYearRange(new Date()))
    const { data, error, runCommand } = useApi(ScrumdappApi.getUserTrendMood(), {
        mapper: toMoodTrend,
        fetchOnCreated: [groupId, "@me", fromDate, toDate],
    })
    return { data, error, retry: retryWith(() => runCommand(groupId, "@me", fromDate, toDate)) }
}

/** Attendance from the start of the current semester up to and including today. */
export function usePeriodAttendance(groupId: number) {
    const today = new Date()
    const fromDate = toScrumdappDate(getSemesterStart(today))
    const toDate = toScrumdappDate(today)
    const { data, error, runCommand } = useApi(ScrumdappApi.getUserTrendPeriod(), {
        mapper: toPeriodBars,
        fetchOnCreated: [groupId, "@me", fromDate, toDate],
    })
    return { data, error, retry: retryWith(() => runCommand(groupId, "@me", fromDate, toDate)) }
}

function earliestMonth(months: string[]) {
    return [...months].sort()[0] ?? null
}

/** The first month with data, null while loading or when there is no data at all. */
export function useFirstDataMonth(groupId: number) {
    return useApi(ScrumdappApi.getCheckpointMonths(), {
        mapper: earliestMonth,
        fetchOnCreated: [groupId],
    }).data
}

/**
 * Month shown in the calendar: never before the first month with data, never past the current month.
 * Going back is disabled while there is no `firstMonth`.
 */
export function useMonthNavigation(firstMonth: string | null) {
    const currentMonth = getYearMonth(new Date())
    const [yearMonth, setYearMonth] = useState(currentMonth)
    return {
        yearMonth,
        canPrev: firstMonth != null && yearMonth > firstMonth,
        canNext: yearMonth < currentMonth,
        prev: () => setYearMonth((ym) => shiftYearMonth(ym, -1)),
        next: () => setYearMonth((ym) => shiftYearMonth(ym, 1)),
    }
}
