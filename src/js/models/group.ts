export type Feature = "checkins" | "checkins.presence" | "checkins.presence_comment" | "checkins.checkin_stars" | "checkins.checkup_stars" | "checkins.checkout_stars" | "checkins.checkin_comment" | "checkins.checkup_comment" | "checkins.checkout_comment" | "checkins.obstacle_comment"

export interface Group extends PartialGroup{
    icon_preference?: string
    enabled_features: Feature[]
}

export interface PartialGroup {
    id: number
    name: string
    background_preference?: string
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
