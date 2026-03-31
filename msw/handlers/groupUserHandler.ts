import {GroupUser} from "../../src/js/models/group";
import { userData } from "./userHandlers";
import {http, HttpResponse} from "msw";


export const groupUserData: GroupUserCollection[] = [
    {
        groupId: 1,
        users: [ 1, 2, 3, 4, 5, 6 ]
    },
    {
        groupId: 2,
        users: [ 2, 3 ]
    },
    {
        groupId: 3,
        users: [ 3, 4 ]
    }
]

function getGroupUsers(collection: GroupUserCollection): GroupUser[] {
    const r: GroupUser[] = []
    for (let userId of collection.users) {
        const user = userData.find(it => it.id == userId)
        if (!user) continue;
        r.push({
            user_id: userId,
            group_id: collection.groupId,
            first_name: user.first_name,
            last_name: user.last_name
        })
    }
    return r
}


export const groupUserHandler = [
    http.get("/api/groups/:gid/users", ({params}) => {
        // @ts-ignore
        const group = groupUserData.find(it => it.groupId == params.gid)
        if (group) {
            return HttpResponse.json(getGroupUsers(group))
        }
        return HttpResponse.json({
            error: true,
            status: 404,
            message: "Not found",
            detail: "The group with this ID does not exist"
        } as object, {
            status: 404
        })
    }),
    http.post("/api/groups/:gid/users", ({params}) => {
        // @ts-ignore
        const group = groupUserData.find(it => it.groupId == params.gid)
        if (group) {
            return HttpResponse.json(getGroupUsers(group))
        }
        return HttpResponse.json({
            error: true,
            status: 404,
            message: "Not found",
            detail: "The group with this ID does not exist"
        } as object, {
            status: 404
        })
    }),
    http.get("/api/groups/:gid/users/:uid", ({params}) => {
        // @ts-ignore
        const group = groupUserData.find(it => it.groupId == params.gid as String)
        if (!group) {
            return HttpResponse.json({
                error: true,
                status: 404,
                message: "Not found",
                detail: "The group with this ID does not exist"
            } as object, {
                status: 404
            })
        }
        const users = getGroupUsers(group)
        // @ts-ignore
        const user = users.find(it => it.user_id == params.uid)
        if (!user) {
            return HttpResponse.json({
                error: true,
                status: 404,
                message: "Not found",
                detail: "This user does not exist in the group"
            } as object, {
                status: 404
            })
        }

        return HttpResponse.json(user)
    }),
    http.delete("/api/groups/:gid/users/:uid", ({params}) => {
        // @ts-ignore
        const group = groupUserData.find(it => it.groupId == params.gid as String)
        if (!group) {
            return HttpResponse.json({
                error: true,
                status: 404,
                message: "Not found",
                detail: "The group with this ID does not exist"
            } as object, {
                status: 404
            })
        }
        const users = getGroupUsers(group)
        // @ts-ignore
        const user = users.find(it => it.user_id == params.uid)
        if (!user) {
            return HttpResponse.json({
                error: true,
                status: 404,
                message: "Not found",
                detail: "This user does not exist in the group"
            } as object, {
                status: 404
            })
        }

        return HttpResponse.json({success: true})
    }),
]


export interface GroupUserCollection {
    groupId: number
    users: number[]
}