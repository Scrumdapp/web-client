

export function getWeekStart(date: Date) {
    return new Date(date.getTime() - ((date.getUTCDay() + 6) % 7) * (24 * 60 * 60 * 1000))
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
