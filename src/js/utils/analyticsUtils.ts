import type { PresenceCounts, UserTrendCalendar, UserTrendMood, UserTrendPeriod, UserTrendSummary } from "../models/trends.ts"
import { toScrumdappDate } from "./scrumdappDate.ts"
import { getYearMonth } from "./timeUtils.ts"

export type CalStatus = "present" | "late" | "sick" | "absent"
export type Trend = "up" | "down" | "flat"

export interface DateRange {
    start: Date
    end: Date
}

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

/** The current and previous week, Monday through Sunday. */
export function getWeekRanges(today: Date): { previous: DateRange, current: DateRange } {
    const monday = addDays(today, -((today.getDay() + 6) % 7))
    return {
        previous: { start: addDays(monday, -7), end: addDays(monday, -1) },
        current: { start: monday, end: addDays(monday, 6) },
    }
}

/** School year: 1 September through 31 August. */
export function getSchoolYearRange(today: Date): DateRange {
    const startYear = today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
    return { start: new Date(startYear, 8, 1), end: new Date(startYear + 1, 7, 31) }
}

/** First day of the current semester. Semester 1: Sep–Jan, semester 2: Feb–Aug. */
export function getSemesterStart(today: Date): Date {
    const y = getSchoolYearRange(today).start.getFullYear()
    const inFirst = today.getMonth() >= 8 || today.getMonth() === 0
    return inFirst ? new Date(y, 8, 1) : new Date(y + 1, 1, 1)
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

// ---------- presence ----------

const calStatuses: readonly string[] = ["present", "late", "sick", "absent"] satisfies CalStatus[]

/** Status values the calendar has no color for (e.g. no data) become null. */
export function toCalStatus(status: string | null | undefined): CalStatus | null {
    return status != null && calStatuses.includes(status) ? status as CalStatus : null
}

/** All check names in a month, in the order they happen within a day. */
function uniqueCheckNames(calendar: UserTrendCalendar): string[] {
    const names: string[] = []
    for (const day of calendar.days) {
        // a new name goes right after the check that came before it that day
        let position = 0
        for (const { name } of day.details) {
            const existing = names.indexOf(name)
            if (existing === -1) names.splice(position, 0, name)
            position = (existing === -1 ? position : existing) + 1
        }
    }
    return names
}

export function toCalendarView(calendar: UserTrendCalendar) {
    const byDate = new Map(calendar.days.map((day) => [
        day.date,
        day.details.map((detail) => ({ name: detail.name, status: toCalStatus(detail.status) })),
    ]))
    const weeks = buildWorkdayGrid(calendar.month).map((week) => week.map((date) =>
        date && { date, checkpoints: byDate.get(toScrumdappDate(date)) ?? [] }
    ))
    const checkNames = uniqueCheckNames(calendar)
    return { weeks, checkNames, empty: checkNames.length === 0 }
}

// ---------- on time ----------

export interface OnTimeSplit {
    onTime: number
    notOnTime: number
    unknown: number
    empty: boolean
}

/** Percentages on time / not on time / unknown. Never NaN: 0 check-ins gives 0/0/0 with empty. */
export function computeOnTimeSplit({ on_time, delayed, no_data }: PresenceCounts): OnTimeSplit {
    const total = on_time + delayed + no_data
    if (total === 0) return { onTime: 0, notOnTime: 0, unknown: 0, empty: true }
    const pct = (n: number) => Math.round((n / total) * 100)
    const onTime = pct(on_time)
    // capped so rounding up both (e.g. 12.5 + 87.5) can never push "unknown" below 0
    const notOnTime = Math.min(pct(delayed), 100 - onTime)
    // remainder goes to "unknown" so the sum is always 100
    return { onTime, notOnTime, unknown: 100 - onTime - notOnTime, empty: false }
}

export function computeTrend(current: OnTimeSplit, previous: OnTimeSplit): { trend: Trend, value: string } {
    if (current.empty || previous.empty) return { trend: "flat", value: "–" }
    const diff = current.onTime - previous.onTime
    return { trend: diff > 0 ? "up" : diff < 0 ? "down" : "flat", value: `${Math.abs(diff)}%` }
}

// ---------- summary ----------

/** The API always uses a scale of 0 to 10 (10 = 5 stars); the page shows 0 to 5 with one decimal. */
function averageToStars(average: number | null, count: number): number | null {
    return average == null || count === 0 ? null : Math.round((average / 2) * 10) / 10
}

/** Being on time or delayed both count as present. */
export function toSummaryView({ presence, stars }: UserTrendSummary, today = new Date()) {
    const previous = computeOnTimeSplit(presence.last_week)
    const current = computeOnTimeSplit(presence.current_week)
    const presentThisMonth = presence.this_month.on_time + presence.this_month.delayed
    const totalThisMonth = presentThisMonth + presence.this_month.no_data
    return {
        weeks: getWeekRanges(today),
        previous,
        current,
        ...computeTrend(current, previous),
        presentThisMonth,
        totalThisMonth,
        presentPct: totalThisMonth === 0 ? 0 : Math.round((presentThisMonth / totalThisMonth) * 100),
        starsAverage: averageToStars(stars.average, stars.count),
        starsCount: stars.count,
    }
}

// ---------- attendance over a period ----------

export interface PeriodBar extends DateRange {
    present: number
    sick: number
    absent: number
}

/** One bar per data point of the API; "late" counts as present. */
export function toPeriodBars(period: UserTrendPeriod) {
    const bars: PeriodBar[] = period.data_points.map((point) => ({
        start: parseLocalDate(point.from_date),
        end: parseLocalDate(point.to_date),
        present: point.present + (point.late ?? 0),
        sick: point.sick,
        absent: point.absent,
    }))
    return { bars, empty: bars.every((bar) => !bar.present && !bar.sick && !bar.absent) }
}

// ---------- mood ----------

export interface MoodPoint {
    date: Date
    score: number
    sessionName: string
}

/**
 * The average covers all reflections (check-ins and check-ups); the chart
 * only shows the last `limit`.
 */
export function toMoodTrend(mood: UserTrendMood, limit = 12) {
    const points: MoodPoint[] = mood.points
        .map((point) => ({ date: parseLocalDate(point.date), score: point.score / 2, sessionName: point.session_name }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
    return { points: points.slice(-limit), average: averageToStars(mood.average, mood.count), count: mood.count }
}
