
export interface GroupCheckpointSession {
    id: number,
    startTime: string,
    name: string,
    duration: number,
    date: string,
    groupId: number,
    ownerId: number,
}

export interface GroupCheckpointSessionCreate {
    name: string,
    duration?: number
}

export interface PartialGroupCheckpointSession {
    id: number,
    startTime: string
    duration: number
    remainingTime: number
}

export interface GroupCheckpoint {
    id: number
    groupUser: number
    sessionId: number
    presence?: string | null
    impediment?: string | null
    stars?: number | null
    comment?: string | null
}

export interface PartialGroupCheckpoint {
    id: number
    groupUser: number
    presence?: number | null
    impediment?: string | null
    stars?: number | null
    comment?: string | null
}

export interface CheckpointSessionFlags {
    date?: string | null
}

export interface UpdateGroupCheckpoint {
    userId: number
    presence?: string | null
    impediment?: string | null
    stars?: number | null
    comment?: string | null
}