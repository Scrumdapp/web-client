
export interface GroupCheckpointSession {
    id: number,
    startTime: string // Check later if this should be Scrumdappdate
    duration: number
    date: string,
    groupId: number,
    ownerId: number,
}

export interface PartialGroupCheckpointSession {
    id: number,
    startTime: string // Check later if this should be Scrumdappdate
    duration: number
    remainingTime: number
}

export interface GroupCheckpoint {
    id: number
    groupUser: number
    sessionId: number

    presence?: number | null
    impediment?: string | null
    stars?: number | null
    comment?: string | null
}

export interface PartialGroupCheckpoint {
    id: number // Is this required?
    groupUser: number,

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

    presence?: number | null
    impediment?: string | null
    stars?: number | null
    comment?: string | null
}