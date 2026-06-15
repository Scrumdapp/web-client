
export interface InviteResponse {
    id: number
    groupId: number
    token: string
    expiresAt: string
    isActive: boolean
}

export interface InviteAcceptResponse {
    userId: number
    groupId: number
}