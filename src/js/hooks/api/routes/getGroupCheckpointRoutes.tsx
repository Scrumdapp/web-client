import {createProcessor, makeApiRequest} from "../apiUtils.ts";
import {GroupCheckpoint, UpdateGroupCheckpoint} from "../../../models/checkpoint.ts";

export function getGroupCheckpointsBySession() {
    return createProcessor("getGroupCheckpointsBySession", (groupId: number, sessionId: number) => {
        return makeApiRequest<GroupCheckpoint[]>("GET", "/groups/{group.id}/checkpoints/{session.id}", {
            params: { "{group.id}": groupId.toString(), "{session.id}": sessionId.toString() }
        })
    })
}

export function getGroupCheckpoints() {
    return createProcessor("getGroupCheckpoints", (groupId: number, session?: number, user?: number) => {
        return makeApiRequest<GroupCheckpoint[]>("GET", "/groups/{group.id}/checkpoints", {
            params: { "{group.id}": groupId.toString() },
            query: {  session, user }
        })
    })
}

export function updateGroupCheckpoint() {
    return createProcessor("updateGroupCheckpoint", (groupId: number, sessionId: number, checkpoint: UpdateGroupCheckpoint)=> {
        return makeApiRequest<GroupCheckpoint>("PATCH", "/groups/{group.id}/checkpoints/{session.id}", {
            body: checkpoint,
            params: { "{group.id}": groupId.toString(), "{session.id}": sessionId.toString() }
        })
    })
}

export function updateGroupCheckpoints() {
    return createProcessor("updateGroupCheckpoints", (groupId: number, sessionId: number, checkpoint: UpdateGroupCheckpoint[])=> {
        return makeApiRequest<GroupCheckpoint[]>("PATCH", "/groups/{group.id}/checkpoints/{session.id}", {
            body: checkpoint,
            params: { "{group.id}": groupId.toString(), "{session.id}": sessionId.toString() }
        })
    })
}
