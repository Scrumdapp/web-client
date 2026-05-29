import { createProcessor, makeApiRequest } from "../apiUtils.ts";
import { InviteResponse } from "../../../models/invites.tsx";

export function CreateInvite() {
    return createProcessor("createInvite", (groupId: number, expiresAt: Date, password: string) => {
        return makeApiRequest<InviteResponse>("POST", "/invites", {
            query: { group: groupId },
            body: {
                password,
                expiresAt
            }
        })
    })
}

export function GetGroupInvites() {
    return createProcessor("getGroupInvites", (groupId: number) => {
        return makeApiRequest<InviteResponse[]>("GET", "/invites", {
            query: { group: groupId },
        })
    })
}

export function GetGroupInvite() {
    return createProcessor("getGroupInvite", (inviteId: number) => {
        return makeApiRequest<InviteResponse>("GET", "/invites/{inviteId}", {
            params: { inviteId }
        })
    })
}

export function DeleteInvite() {
    return createProcessor("deleteInvite", (inviteId: number) => {
        return makeApiRequest("DELETE", "/invites/{inviteId}", {
            params: { inviteId }
        })
    })
}

export function AcceptInvite() {
    return createProcessor("acceptInvite", (inviteId: number, userId: number, token: number, password: string) => {
        return makeApiRequest("POST", "/invites/{inviteId}/accept", {
            params: { inviteId },
            body: { userId, token, password }
        })
    })
}
