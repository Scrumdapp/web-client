
export interface GroupPresenceTrends {
    fromDate: string
    toDate: string
    trends: PresenceTrendItem[]
}

export interface PresenceTrendItem {
    userId: number
    days: PresenceTrendDay[]
}

export interface PresenceTrendDay {
    date: string
    presences: PresenceTrendDayItem[]
}

export interface PresenceTrendDayItem {
    presence: string | null
    sessionId: number
    name: string
}

// A numeric user id, or "@me" for the logged in user
export type TrendUserId = number | "@me"

export interface PresenceCounts {
    on_time: number
    delayed: number
    no_data: number
}

export interface UserTrendSummaryPresence {
    current_week: PresenceCounts
    last_week: PresenceCounts
    this_month: PresenceCounts
    last_month: PresenceCounts
}

export interface UserTrendSummaryStars {
    average: number | null
    count: number
}

export interface UserTrendSummary {
    presence: UserTrendSummaryPresence
    stars: UserTrendSummaryStars
}

export interface UserTrendCalendarDetail {
    name: string
    status: string | null
}

export interface UserTrendCalendarDay {
    date: string
    details: UserTrendCalendarDetail[]
}

export interface UserTrendCalendar {
    month: string
    days: UserTrendCalendarDay[]
}

export interface UserTrendMoodPoint {
    date: string
    session_name: string
    // Scale of 0 to 10, where 10 = 5 stars
    score: number
}

export interface UserTrendMood {
    from_date: string
    to_date: string
    average: number | null
    count: number
    points: UserTrendMoodPoint[]
}

export interface UserTrendPeriodDataPoint {
    from_date: string
    to_date: string
    present: number
    sick: number
    late?: number
    absent: number
    no_data: number
}

export interface UserTrendPeriod {
    from_date: string
    to_date: string
    data_points: UserTrendPeriodDataPoint[]
}
