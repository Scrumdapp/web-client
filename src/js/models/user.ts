
export interface User extends PartialUser {
    theme_preference: string | null
    language_preference: string | null
    avatar: string | null,
    roles: string[]
}

export interface PatchUser {
    theme_preference?: string
    language_preference?: string
}

export interface PartialUser {
    id: number
    first_name: string
    last_name: string
}
