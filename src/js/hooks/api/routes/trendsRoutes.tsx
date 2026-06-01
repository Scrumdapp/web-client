import { GroupPresenceTrends } from "../../../models/trends";
import { createProcessor, makeApiRequest } from "../apiUtils";

export function getGroupTimelineTrends() {
    return createProcessor("getGroupTimelineTrends", (groupId: number, from?: string, to?: string) => {
        return makeApiRequest<GroupPresenceTrends>("GET", "/trends/grouptimeline/{groupId}", {
            params: { "{groupId}": groupId.toString() },
            query: { ...(from ? { from } : {}), ...(to ? { to } : {}) }
        })
    })
}
