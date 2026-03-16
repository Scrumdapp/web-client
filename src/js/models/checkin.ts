export interface GroupCheckin {
    user_id: number
    group_id: number
    date: string

    presence?: string
    presence_comment?: string

    checkin_stars?: number
    checkin_comment?: string

    checkup_stars?: number
    checkup_comment? : string

    checkout_stars?: number
    checkout_comment?: string

    obstacle_comment?: string
}

export interface UpdateGroupCheckin {
    presence?: string
    presence_comment?: string

    checkin_stars?: number
    checkin_comment?: string

    checkup_stars?: number
    checkup_comment? : string

    checkout_stars?: number
    checkout_comment?: string

    obstacle_comment?: string
}

export interface GroupCheckinsUpdate {
    user_id: number
    presence?: string
    presence_comment?: string
    checkin_stars?: number
    checkup_stars?: number
    checkout_stars?: number
}