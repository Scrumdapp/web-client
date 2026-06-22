import { parseStr } from "./scrumdappDate"

export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY

export function getWeekStart(date: Date) {
    return new Date(date.getTime() - ((date.getUTCDay() + 6) % 7) * DAY)
}

export function getWeekEnd(date: Date) {
    return new Date(date.getTime() - (((date.getUTCDay() + 6) % 7)) * DAY + 6 * DAY)
}

export function getWeeksBetween(from: Date, to: Date) {
    return Math.ceil((to.getTime() - from.getTime()) / WEEK)
}

export function firstDayOfMonth(date: Date) {
    const nd = new Date(date)
    nd.setDate(1)
    return nd
}

export function lastDayOfMonth(date: Date) {
    const fd = firstDayOfMonth(date)
    fd.setMonth(fd.getMonth() + 1)
    fd.setDate(fd.getDate() - 1)
    return fd;
}

export function previousMonth(date: Date) {
    const nd = new Date(date)
    nd.setMonth(nd.getMonth() - 1)
    return nd
}

export function nextMonth(date: Date) {
    const nd = new Date(date)
    nd.setMonth(nd.getMonth() + 1)
    return nd
}

export function parseWeekDay(day: number) {
    switch (day) {
        case 1: return "Mon"
        case 2: return "Tue"
        case 3: return "Wed"
        case 4: return "Thu"
        case 5: return "Fri"
        case 6: return "Sat"
        case 0: return "Sun"
    }
}

export function parseMonthText(month: number) {
    switch (month) {
        case 0: return "January"
        case 1: return "February"
        case 2: return "March"
        case 3: return "April"
        case 4: return "May"
        case 5: return "June"
        case 6: return "July"
        case 7: return "August"
        case 8: return "September"
        case 9: return "Oktober"
        case 10: return "November"
        case 11: return "December"
    }
}

const regex = /^(\d{4})-(\d{2})$/
export function parseYearMonth(yearMonth: string) {
    const result = regex.exec(yearMonth)
    if (result == null) {
        throw new Error("Could not parse yearMonth")
    }
    const year = result[1]
    const month = result[2]
    const resultDate = Date.UTC(parseInt(year), parseInt(month) - 1)
    return new Date(resultDate)
}

export function isYearMonth(yearMonth: string) {
    return regex.test(yearMonth)
}

export function getYearMonth(date: Date) {
    return `${date.getFullYear()}-${parseStr(date.getMonth() + 1)}`
}

export function getWeekNumber(date: Date) {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
}
