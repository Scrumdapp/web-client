
export interface GroupPresenceTrends {
    fromDate: string
    toDate: string
    trends: PresenceTrendItem[]
}

export interface PresenceTrendItem {
    userId: number
    presences: string[]
}