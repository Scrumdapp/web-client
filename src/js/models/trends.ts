
export interface GroupPresenceTrends {
    fromDate: string
    toDate: string
    trends: PresenceTrendItem[]
}

export interface PresenceTrendItem {
    userId: number
    presences: PresenceTrendDay[]
}

export interface PresenceTrendDay {
    date: string
    presences: PresenceTrendDayItem[]
}

export interface PresenceTrendDayItem {
    presence: string | null
    sessionId: number
}
