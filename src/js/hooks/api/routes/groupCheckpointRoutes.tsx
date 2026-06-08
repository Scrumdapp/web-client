import { createProcessor, makeApiRequest } from "../apiUtils.ts";
import { GroupCheckpoint, UpdateGroupCheckpoint } from "../../../models/checkpoint.ts";

export function getGroupCheckpoints() {
    return createProcessor("getGroupCheckpoints", (groupId: number, session?: number, user?: number) => {
        return makeApiRequest<GroupCheckpoint[]>("GET", "/groups/{groupId}/checkpoints", {
            params: { "{groupId}": groupId.toString() },
            query: { session, user }
        })
    })
}

export function updateGroupCheckpoint() {
    return createProcessor("updateGroupCheckpoint", (groupId: number, checkpoint: UpdateGroupCheckpoint) => {
        return makeApiRequest<GroupCheckpoint>("PATCH", "/groups/{groupId}/checkpoints", {
            params: { "{groupId}": groupId.toString(), },
            body: checkpoint,
        })
    })
}
