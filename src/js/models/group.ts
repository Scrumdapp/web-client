export interface Group extends PartialGroup{
    icon_preference: string
    enabled_features: string[]
}

export interface PartialGroup {
    id: number
    name: string
    background_preference: string
}

export interface CreateGroup {
    name: string
}

export interface PatchGroup {
    name?: string
    background_preference?: string
    icon_preference?: string
    enabled_features?: string[]
}

export interface GroupUser {
    user_id: number
    group_id: number
    first_name: string
    last_name: string
}

export interface GroupCheckin {
    user_id: number
    group_id: number
    date: string

    presence: string

    checkin_stars?: number
    checkin_comment?: string

    checkup_stars?: number
    checkup_comment? : string

    checkout_stars?: number
    checkout_comment?: string

    obstacle_comment?: string
}