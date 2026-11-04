import { useEffect, useMemo, useState } from "react"
import { ScrumdappApi } from "../api/scrumdappApi.ts"
import { useApi } from "../api/useApi.ts"
import type { RequestProcessor } from "../api/apiUtils.ts"
import {
    aggregateMonthly,
    buildWorkdayGrid,
    computeMoodTrend,
    computeOnTimeSplit,
    computeTrend,
    countWorkdays,
    DateRange,
    daysInRange,
    getSchoolYearRange,
    getSemesterMonths,
    getSprintRanges,
    monthRange,
    presenceToCalStatus,
    rangeToQuery,
    shiftYearMonth,
} from "../../utils/analyticsUtils.ts"
import { toScrumdappDate } from "../../utils/scrumdappDate.ts"
import { getYearMonth } from "../../utils/timeUtils.ts"

/** Fetches on mount and whenever the params change; `retry` fetches again. */
function useFetch<A extends unknown[], R>(processor: RequestProcessor<A, R>, ...params: A) {
    const { data, error, runCommand } = useApi(processor)
    const [attempt, setAttempt] = useState(0)
    const key = JSON.stringify(params)
    useEffect(() => {
        runCommand(...params).catch(() => { /* error is stored by useApi */ })
    }, [runCommand, key, attempt]) // eslint-disable-line react-hooks/exhaustive-deps
    return { data, error, retry: () => setAttempt((n) => n + 1) }
}

/** Attendance trend of one user for a date range, in a single request. `range` must be memoized. */
function useTrendDays(groupId: number, userId: number, range: DateRange) {
    const [from, to] = rangeToQuery(range)
    const trends = useFetch(ScrumdappApi.getGroupTimelineTrends(), groupId, from, to)
    const days = useMemo(() => {
        if (trends.data == null) return null
        return daysInRange(trends.data.trends.find((it) => it.userId === userId)?.days ?? [], range)
    }, [trends.data, userId, range])
    return { days, error: trends.error, retry: trends.retry }
}

export function useOnTimeComparison(groupId: number, userId: number) {
    const sprints = useMemo(() => getSprintRanges(new Date()), [])
    const range = useMemo(() => ({ start: sprints.previous.start, end: sprints.current.end }), [sprints])
    const { days, error, retry } = useTrendDays(groupId, userId, range)

    const data = useMemo(() => {
        if (days == null) return null
        const split = (r: DateRange) =>
            computeOnTimeSplit(daysInRange(days, r).flatMap((d) => d.presences.map((p) => p.presence)))
        const previous = split(sprints.previous)
        const current = split(sprints.current)
        return { sprints, previous, current, ...computeTrend(current, previous) }
    }, [days, sprints])

    return { data, error, retry }
}

/**
 * Month shown in the calendar: never before the first month with data, never past the current month.
 * Going back is disabled while `firstMonth` is loading (undefined) or when there is no data at all (null).
 */
export function useMonthNavigation(firstMonth: string | null | undefined) {
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

export function useAttendanceMonth(groupId: number, userId: number, yearMonth: string) {
    const range = useMemo(() => monthRange(yearMonth), [yearMonth])
    const { days, error, retry } = useTrendDays(groupId, userId, range)

    const data = useMemo(() => {
        if (days == null) return null
        const byDate = new Map(days.map((day) => [
            day.date,
            // order within a day = creation order (sessionId)
            [...day.presences]
                .sort((a, b) => a.sessionId - b.sessionId)
                .map((p) => ({ name: p.name, status: presenceToCalStatus(p.presence) })),
        ]))
        const weeks = buildWorkdayGrid(yearMonth).map((week) => week.map((date) =>
            date && { date, checkpoints: byDate.get(toScrumdappDate(date)) ?? [] }
        ))
        return { weeks, empty: byDate.size === 0 }
    }, [days, yearMonth])

    return { data, error, retry }
}

/** Star scores from the user's check-ins and check-ups, linked to their session for date and name. */
export function useMoodTrend(groupId: number, userId: number) {
    const sessionQuery = useMemo(() => {
        const [start_date, end_date] = rangeToQuery(getSchoolYearRange(new Date()))
        return { range: { start_date, end_date } }
    }, [])
    const checkpoints = useFetch(ScrumdappApi.getGroupCheckpoints(), groupId, undefined, userId)
    const sessions = useFetch(ScrumdappApi.getCheckpointSessions(), groupId, sessionQuery)

    const data = useMemo(() => {
        if (checkpoints.data == null || sessions.data == null) return null
        // defensively filter on user, in case the API ignores the user query
        return computeMoodTrend(checkpoints.data.filter((cp) => cp.groupUser === userId), sessions.data)
    }, [checkpoints.data, sessions.data, userId])

    return {
        data,
        error: checkpoints.error ?? sessions.error,
        retry: () => { checkpoints.retry(); sessions.retry() },
    }
}

/** One trends request for the whole school year; shows the current semester. */
export function useYearlyAttendance(groupId: number, userId: number) {
    const today = useMemo(() => new Date(), [])
    const schoolYear = useMemo(() => getSchoolYearRange(today), [today])
    const trend = useTrendDays(groupId, userId, schoolYear)
    const months = useFetch(ScrumdappApi.getCheckpointMonths(), groupId)

    const data = useMemo(() => {
        if (trend.days == null || months.data == null) return null
        const firstMonth = [...months.data].sort()[0] ?? null
        const totals = aggregateMonthly(trend.days, getSemesterMonths(today), firstMonth, today)

        // KPI "present this month": days present vs. workdays up to and including today
        const currentMonth = getYearMonth(today)
        const presentThisMonth = totals.find((t) => t.yearMonth === currentMonth)?.present ?? 0
        const workdaysThisMonth = countWorkdays({ start: monthRange(currentMonth).start, end: today })

        return {
            months: totals,
            firstMonth,
            empty: totals.every((t) => !t.present && !t.sick && !t.absent),
            presentThisMonth,
            workdaysThisMonth,
            presentPct: workdaysThisMonth === 0 ? 0 : Math.min(100, Math.round((presentThisMonth / workdaysThisMonth) * 100)),
        }
    }, [trend.days, months.data, today])

    return {
        data,
        error: trend.error ?? months.error,
        retry: () => { trend.retry(); months.retry() },
    }
}
