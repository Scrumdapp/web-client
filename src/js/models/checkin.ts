export interface UserGroupCheckin extends GroupCheckin {
    first_name: string,
    last_name: string
}

export interface GroupCheckin {
    user_id: number
    group_id: number
    date: string

    presence?: string | null
    presence_comment?: string | null

    checkin_stars?: number | null
    checkin_comment?: string | null

    checkup_stars?: number | null
    checkup_comment? : string | null

    checkout_stars?: number | null
    checkout_comment?: string | null

    obstacle_comment?: string | null
}

export interface CheckinFieldFlags {
    presence?: boolean
    presence_comment?: boolean
    checkin_stars?: boolean
    checkin_comment?: boolean
    checkup_stars?: boolean
    checkup_comment?: boolean
    checkout_stars?: boolean
    checkout_comment?: boolean
    obstacle_comment?: boolean
}

export interface UpdateGroupCheckin {
    presence?: string | null
    presence_comment?: string | null

    checkin_stars?: number | null
    checkin_comment?: string | null

    checkup_stars?: number | null
    checkup_comment? : string | null

    checkout_stars?: number | null
    checkout_comment?: string | null

    obstacle_comment?: string | null
}

export interface GroupCheckinsUpdate {
    user_id: number
    presence?: string
    presence_comment?: string
    checkin_stars?: number
    checkup_stars?: number
    checkout_stars?: number
}