import { createProcessor, GetCheckpointQueryOptions, makeApiRequest } from "../apiUtils.ts";
import { GroupCheckpointSession, GroupCheckpointSessionCreate, SessionDates } from "../../../models/checkpoint.ts";

export function getCheckpointSessions() {
    return createProcessor("GetCheckpointSessions", (groupId: number, queryOptions: GetCheckpointQueryOptions) => {
        return makeApiRequest<GroupCheckpointSession[]>("GET", "/groups/{group.id}/sessions", {
            params: { "{group.id}": groupId.toString() },
            query: {
                // @ts-ignore
                ...(queryOptions.hasOwnProperty("range") ? queryOptions.range : {}),
                // @ts-ignore
                ...(queryOptions.hasOwnProperty("date") ? { date: queryOptions.date } : {})
            }
        })
    })
}

export function getCheckpointSessionById() {
    return createProcessor("GetCheckpointSessionById", (groupId: number, sessionId: number) => {
        return makeApiRequest<GroupCheckpointSession>("GET", "/groups/{group.id}/session/{session.id}", {
            params: { "{group.id}": groupId.toString(), "{session.id}": sessionId.toString() }
        })
    })
}

export function createCheckpointSessions() {
    return createProcessor("createCheckpointSession", (groupId: number, body: GroupCheckpointSessionCreate) => {
        return makeApiRequest<GroupCheckpointSession>("POST", "/groups/{group.id}/sessions", {
            body: body,
            params: { "{group.id}": groupId.toString() }
        })
    })
}

export function getRecentCheckpointDates() {
    return createProcessor("getRecentCheckpointDates", (groupId: number, limit: number) => {
        return makeApiRequest<SessionDates>("GET", "/groups/{groupId}/sessions/dates", {
            params: { "{groupId}": groupId },
            query: { limit }
        })
    })
}

export function getCheckpointDatesInMonth() {
    return createProcessor("getRecentCheckpointDates", (groupId: number, yearMonth: string) => {
        return makeApiRequest<SessionDates>("GET", "/groups/{groupId}/sessions/dates", {
            params: { "{groupId}": groupId },
            query: { month: yearMonth }
        })
    })
}
