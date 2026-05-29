import {createProcessor, makeApiRequest} from "../apiUtils.ts";
import {GroupUser} from "../../../models/group.ts";

export function getGroupUsers() {
    return createProcessor("getGoupUsers", (groupId: number) => {
        return makeApiRequest<GroupUser[]>("GET", "/groups/{id}/users", {
            params: { "{id}": groupId.toString() }
        })
    })
}

export function addUser() {
    return createProcessor("addUser", (groupId: number, userId: number) => {
        return makeApiRequest<GroupUser>("POST", "/groups/{id}/users", {
            body: { user_id: userId },
            params: { "{id}": groupId.toString() }
        })
    })
}

export function deleteGroupUser() {
    return createProcessor("deleteGroupUser", (groupId: number, userId: number) => {
        return makeApiRequest<{ success: true }>("DELETE", "/groups/{group.id}/users/{user.id}", {
            params: { "{group.id}": groupId.toString(), "{user.id}": userId.toString() }
        })
    })
}
