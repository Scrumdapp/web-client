import { http, HttpResponse } from "msw";
import { InviteResponse } from "../../src/js/models/invites.tsx";
import { groupData } from "./groupHandlers";
import { Group } from "../../src/js/models/group";
import { parseScrumdappDate, toScrumdappDate } from "../../src/js/utils/scrumdappDate";

export type InviteResponseDB = InviteResponse & {
    password: string
}

export const inviteData: { [groupId: number]: InviteResponseDB[] } = {}
export const inviteDataById: InviteResponseDB[] = []

for (let group of groupData) {
    createInviteData(group)
}

function createInviteData(group: Group) {
    const invites: InviteResponseDB[] = []
    const now = parseScrumdappDate(toScrumdappDate(new Date()));

    for (let i = Math.floor(Math.random() * 5); i-- > 0;) {
        const expires = parseScrumdappDate(toScrumdappDate(new Date(Math.random() * (7 * 24 * 60 * 60 * 1000) - (2 * 24 * 60 * 60 * 1000))))
        const expired = now >= expires;

        const invite = {
            id: 0,
            groupId: group.id,
            token: generateInsecureTestToken(),
            expiresAt: toScrumdappDate(expires),
            password: "123",
            isActive: expired
        }
        const id = inviteDataById.push(invite)
        invite.id = id;
        invites.push(invite);
    }

    inviteData[group.id] = invites;
}

function generateInsecureTestToken() {
    let s = "TEST-"
    for (let i = 24; i-- > 0;) {
        s += "abcABC1230"[Math.floor(Math.random() * 10)]
    }
    return s;
}

export const inviteHandlers = [
    http.post("/api/invites", async ({ request }) => {
        const json: any = await request.json()
        const params = new URL(request.url).searchParams
        //@ts-ignore
        const group = groupData.find(it => it.id == params.get("group") as string)!


        const expires = json.expiresAt as string;
        const password = json.password as string;
        const invite: InviteResponseDB = {
            id: 0,
            groupId: group.id,
            token: generateInsecureTestToken(),
            expiresAt: expires,
            password: password,
            isActive: true
        }

        const id = inviteDataById.push(invite)
        invite.id = id;
        inviteData[group.id].push(invite)

        return HttpResponse.json(invite);
    }),
    http.get("/api/invites", ({ params }) => {
        //@ts-ignore
        const group = groupData.find(it => it.id == params["group"] as string)!
        return HttpResponse.json(inviteData[group.id])
    }),
    http.get("/api/invites/:inviteId", ({ params }) => {
        return HttpResponse.json(inviteDataById[parseInt(params["inviteId"] as string)])
    }),
    http.post("/api/invites/:inviteId/accept", ({ }) => {
        return new HttpResponse()
    }),
    http.delete("/api/invites/:inviteId", ({ }) => {
        return new HttpResponse()
    }),
]
