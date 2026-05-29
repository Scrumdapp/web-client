import {createProcessor, makeApiRequest} from "../apiUtils.ts";
import {CreateGroup, Group, PartialGroup, PatchGroup} from "../../../models/group.ts";


export function getGroups() {
    return createProcessor("getGroups", () => {
        return makeApiRequest<PartialGroup[]>("GET", "/groups")
    })
}

export function createGroup() {
    return createProcessor("createGroup", (group: CreateGroup) => {
        return makeApiRequest<Group>("POST", "/groups", {
            body: group
        })
    })
}

export function getGroup() {
    return createProcessor("getGroup", (groupId: number) => {
        return makeApiRequest<Group>("GET", "/groups/{id}", {
            params: {"{id}": groupId.toString()}
        })
    })
}

export function updateGroup() {
    return createProcessor("updateGroup", (groupId: number, newData: PatchGroup) => {
        return makeApiRequest<Group>("PATCH", "/groups/{id}", {
            body: newData,
            params: {"{id}": groupId.toString()}
        })
    })
}

export function deleteGroup() {
    return createProcessor("deleteGroup", (groupId: number) => {
        return makeApiRequest<{ success: true }>("DELETE", "/groups/{id}", {
            params: {"{id}": groupId.toString()},
        })
    })
}