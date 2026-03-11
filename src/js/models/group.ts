export interface GroupData {
    id: number
    name: string
}

export interface GroupUser {
    userId: number
    groupId: number
    name: string
    permissions?: string[]
}