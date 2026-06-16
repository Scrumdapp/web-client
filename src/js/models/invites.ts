
export interface InviteResponse {
    id: number
    groupId: number
    token: string
    expiresAt: string
    isActive: boolean
}

export interface InviteAcceptResponse {
    groupId: number,
    groupName: string
}