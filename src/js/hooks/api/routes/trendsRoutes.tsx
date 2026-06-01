import { createProcessor, makeApiRequest } from "../apiUtils";

export function getGroupTimelineTrends() {
    return createProcessor("getGroupTimelineTrends", (groupId: number, from?: string, to?: string) => {
        return makeApiRequest("GET", "/trends/grouptimeline/{groupId}", {
            params: { groupId },
            query: { ...(from ? { from } : {}), ...(to ? { to } : {}) }
        })
    })
}
