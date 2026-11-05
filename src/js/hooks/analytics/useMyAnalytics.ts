import { useEffect, useState } from "react"
import { ScrumdappApi } from "../api/scrumdappApi.ts"
import { useApi } from "../api/useApi.ts"
import type { RequestProcessor } from "../api/apiUtils.ts"
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

/**
 * Fetches on mount and whenever the params change; `retry` fetches again.
 * The mapper must not use props: useApi keeps the first one per processor.
 */
function useTrendRequest<A extends unknown[], R, M>(processor: RequestProcessor<A, R>, mapper: (data: R) => M, ...params: A) {
    const { data, error, runCommand } = useApi(processor, { mapper })
    const fetchData = () => {
        runCommand(...params).catch(() => { /* Error is stored by useApi */ })
    }
    const key = JSON.stringify(params)
    useEffect(fetchData, [processor.id, key]) // eslint-disable-line react-hooks/exhaustive-deps
    return { data, error, retry: fetchData }
}

export function useTrendSummary(groupId: number) {
    return useTrendRequest(ScrumdappApi.getUserTrendSummary(), toSummaryView, groupId, "@me")
}

export function useAttendanceMonth(groupId: number, yearMonth: string) {
    return useTrendRequest(ScrumdappApi.getUserTrendCalendar(), toCalendarView, groupId, "@me", yearMonth)
}

/** Star scores of the current school year. */
export function useMoodTrend(groupId: number) {
    const [fromDate, toDate] = rangeToQuery(getSchoolYearRange(new Date()))
    return useTrendRequest(ScrumdappApi.getUserTrendMood(), toMoodTrend, groupId, "@me", fromDate, toDate)
}

/** Attendance from the start of the current semester up to and including today. */
export function usePeriodAttendance(groupId: number) {
    const today = new Date()
    const fromDate = toScrumdappDate(getSemesterStart(today))
    return useTrendRequest(ScrumdappApi.getUserTrendPeriod(), toPeriodBars, groupId, "@me", fromDate, toScrumdappDate(today))
}

function earliestMonth(months: string[]) {
    return [...months].sort()[0] ?? null
}

/** The first month with data, null while loading or when there is no data at all. */
export function useFirstDataMonth(groupId: number) {
    return useTrendRequest(ScrumdappApi.getCheckpointMonths(), earliestMonth, groupId).data
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
