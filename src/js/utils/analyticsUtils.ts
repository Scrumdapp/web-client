import type { GroupCheckpoint, GroupCheckpointSession } from "../models/checkpoint.ts"
import type { PresenceTrendDay } from "../models/trends.ts"
import { toScrumdappDate } from "./scrumdappDate.ts"
import { getYearMonth } from "./timeUtils.ts"

export type CalStatus = "present" | "late" | "sick" | "absent"
export type Trend = "up" | "down" | "flat"
export type DailyCheck = "standup" | "checkup"

export interface DateRange {
    start: Date
    end: Date
}

// There is no sprint entity in the API: a sprint is a fixed block of
// 2 weeks, always starting on a Monday, counted from this anchor.
const SPRINT_ANCHOR = new Date(2026, 0, 5)
const SPRINT_DAYS = 14
const DAY_MS = 24 * 60 * 60 * 1000

// ---------- dates ----------

/** Parse "YYYY-MM-DD" as a local date (not UTC, to avoid off-by-one-day shifts). */
export function parseLocalDate(date: string): Date {
    const [y, m, d] = date.split("-").map(Number)
    return new Date(y, m - 1, d)
}

export function addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** Parse "YYYY-MM" as the 1st of that month in local time (timeUtils' parseYearMonth uses UTC). */
export function parseLocalYearMonth(yearMonth: string): Date {
    return parseLocalDate(`${yearMonth}-01`)
}

export function shiftYearMonth(yearMonth: string, delta: number): string {
    const d = parseLocalYearMonth(yearMonth)
    return getYearMonth(new Date(d.getFullYear(), d.getMonth() + delta, 1))
}

export function monthRange(yearMonth: string): DateRange {
    const start = parseLocalYearMonth(yearMonth)
    return { start, end: new Date(start.getFullYear(), start.getMonth() + 1, 0) }
}

export function rangeToQuery(range: DateRange): [string, string] {
    return [toScrumdappDate(range.start), toScrumdappDate(range.end)]
}

export function getSprintRanges(today: Date): { previous: DateRange, current: DateRange } {
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    // round, not floor: across a DST change the difference is a whole number of days ± 1 hour
    const daysSinceAnchor = Math.round((startOfToday.getTime() - SPRINT_ANCHOR.getTime()) / DAY_MS)
    const currentStart = addDays(SPRINT_ANCHOR, Math.floor(daysSinceAnchor / SPRINT_DAYS) * SPRINT_DAYS)
    return {
        previous: { start: addDays(currentStart, -SPRINT_DAYS), end: addDays(currentStart, -1) },
        current: { start: currentStart, end: addDays(currentStart, SPRINT_DAYS - 1) },
    }
}

/** School year: 1 September through 31 August. */
export function getSchoolYearRange(today: Date): DateRange {
    const startYear = today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
    return { start: new Date(startYear, 8, 1), end: new Date(startYear + 1, 7, 31) }
}

/** Months of the current semester. Semester 1: Sep–Jan, semester 2: Feb–Aug. */
export function getSemesterMonths(today: Date): string[] {
    const y = getSchoolYearRange(today).start.getFullYear()
    const inFirst = today.getMonth() >= 8 || today.getMonth() === 0
    const [startMonth, count] = inFirst ? [8, 5] : [13, 7]
    return Array.from({ length: count }, (_, i) => getYearMonth(new Date(y, startMonth + i, 1)))
}

/** Workdays (Mon–Fri) of a month as weeks of 5 cells, padded with null. */
export function buildWorkdayGrid(yearMonth: string): (Date | null)[][] {
    const { start, end } = monthRange(yearMonth)
    const weeks: (Date | null)[][] = []
    let week: (Date | null)[] = Array(5).fill(null)
    for (let d = start; d <= end; d = addDays(d, 1)) {
        const weekday = (d.getDay() + 6) % 7 // Mon = 0
        if (weekday > 4) continue
        week[weekday] = d
        if (weekday === 4) {
            weeks.push(week)
            week = Array(5).fill(null)
        }
    }
    if (week.some((it) => it != null)) weeks.push(week)
    return weeks
}

export function countWorkdays(range: DateRange): number {
    let count = 0
    for (let d = range.start; d <= range.end; d = addDays(d, 1)) {
        if (d.getDay() !== 0 && d.getDay() !== 6) count++
    }
    return count
}

export function daysInRange(days: PresenceTrendDay[], range: DateRange): PresenceTrendDay[] {
    return days.filter((day) => {
        const d = parseLocalDate(day.date)
        return d >= range.start && d <= range.end
    })
}

// ---------- presence ----------

const presenceStatus: Record<string, CalStatus> = {
    ON_TIME: "present",
    ONLINE: "present",
    LATE: "late",
    VERIFIED_LATE: "late",
    SICK: "sick",
    ABSENT: "absent",
    VERIFIED_ABSENT: "absent",
}

export function presenceToCalStatus(presence: string | null | undefined): CalStatus | null {
    return presenceStatus[presence ?? ""] ?? null
}

// With multiple checkpoints on one day, the worst status counts:
// absent > late > sick > present.
const severity: Record<CalStatus, number> = { present: 0, sick: 1, late: 2, absent: 3 }

function worstStatus(statuses: (CalStatus | null)[]): CalStatus | null {
    let worst: CalStatus | null = null
    for (const status of statuses) {
        if (status != null && (worst == null || severity[status] > severity[worst])) worst = status
    }
    return worst
}

/** Stand-up = first check of the day, check-up = last (only if there are ≥2 checks). */
export function statusForCheck(statuses: (CalStatus | null)[], check: DailyCheck): CalStatus | null {
    if (check === "standup") return statuses[0] ?? null
    return statuses.length >= 2 ? statuses[statuses.length - 1] : null
}

// ---------- on time ----------

export interface OnTimeSplit {
    onTime: number
    notOnTime: number
    unknown: number
    empty: boolean
}

/** Percentages on time / not on time / unknown. Never NaN: 0 check-ins gives 0/0/0 with empty. */
export function computeOnTimeSplit(presences: (string | null | undefined)[]): OnTimeSplit {
    const total = presences.length
    if (total === 0) return { onTime: 0, notOnTime: 0, unknown: 0, empty: true }
    const status = presences.map(presenceToCalStatus)
    const pct = (n: number) => Math.round((n / total) * 100)
    const onTime = pct(status.filter((s) => s === "present").length)
    // capped so rounding up both (e.g. 12.5 + 87.5) can never push "unknown" below 0
    const notOnTime = Math.min(pct(status.filter((s) => s === "late" || s === "absent").length), 100 - onTime)
    // remainder goes to "unknown" so the sum is always 100
    return { onTime, notOnTime, unknown: 100 - onTime - notOnTime, empty: false }
}

export function computeTrend(current: OnTimeSplit, previous: OnTimeSplit): { trend: Trend, value: string } {
    if (current.empty || previous.empty) return { trend: "flat", value: "–" }
    const diff = current.onTime - previous.onTime
    return { trend: diff > 0 ? "up" : diff < 0 ? "down" : "flat", value: `${Math.abs(diff)}%` }
}

// ---------- yearly overview ----------

export interface MonthTotals {
    yearMonth: string
    present: number | null
    sick: number | null
    absent: number | null
}

/**
 * Counts per month how many days each status occurred (worst status per day,
 * "late" counts as present). Months before the first month with data, and
 * months in the future, become null (empty) instead of 0.
 */
export function aggregateMonthly(
    days: PresenceTrendDay[],
    months: string[],
    firstDataMonth: string | null,
    today: Date,
): MonthTotals[] {
    const currentMonth = getYearMonth(today)
    return months.map((ym) => {
        if (firstDataMonth == null || ym < firstDataMonth || ym > currentMonth) {
            return { yearMonth: ym, present: null, sick: null, absent: null }
        }
        const totals = { yearMonth: ym, present: 0, sick: 0, absent: 0 }
        for (const day of days) {
            if (!day.date.startsWith(ym)) continue
            const status = worstStatus(day.presences.map((p) => presenceToCalStatus(p.presence)))
            if (status === "present" || status === "late") totals.present++
            else if (status === "sick") totals.sick++
            else if (status === "absent") totals.absent++
        }
        return totals
    })
}

// ---------- mood ----------

export interface MoodPoint {
    date: Date
    score: number
    sessionName: string
}

/**
 * Stars range from 0 to 10 in the API (half stars), converted to 0–5 here.
 * The average covers all reflections (check-ins and check-ups); the chart
 * only shows the last `limit`.
 */
export function computeMoodTrend(checkpoints: GroupCheckpoint[], sessions: GroupCheckpointSession[], limit = 12) {
    const sessionsById = new Map(sessions.map((s) => [s.id, s]))
    const all: MoodPoint[] = []
    for (const cp of checkpoints) {
        const session = sessionsById.get(cp.sessionId)
        if (cp.stars == null || session == null) continue
        all.push({ date: new Date(session.startTime), score: cp.stars / 2, sessionName: session.name })
    }
    all.sort((a, b) => a.date.getTime() - b.date.getTime())
    const average = all.length === 0
        ? null
        : Math.round((all.reduce((sum, p) => sum + p.score, 0) / all.length) * 10) / 10
    return { points: all.slice(-limit), average, count: all.length }
}
