import {ApiError} from "./apiError.ts";
import type {PartialUser, PatchUser, User} from "../../models/user.ts";
import type {CreateGroup, Group, GroupUser, PartialGroup, PatchGroup} from "../../models/group.ts";
import {RequestException} from "./apiError.ts";
import {isErrorDto} from "../../models/dto/errorDto.ts";
import type {UpdateGroupCheckin, GroupCheckin, GroupCheckinsUpdate, UserGroupCheckin, CheckinFieldFlags} from "../../models/checkin.ts";


export namespace ScrumdappApi {

    const API_URL = (import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api").replace(/\/$/, "")

    export type RequestProcessor<Ti extends any[], Tr> = MRP<Ti, Promise<Tr>>
    export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
    export type RequestParams = { [key: string]: string | undefined }

    type MRP<Ti extends any[], Tr> = ((...inputs: Ti) => Tr) & { id: string }

    export type CheckinRangeParams = {
        "start_date": string,
        "end_date": string
    }

    export function getCurrentUser() {
        return createProcessor("getCurrentUser", () => {
            return makeApiRequest<User>("GET", "/users/@me")
        })
    }

    export function updateCurrentUser() {
        return createProcessor("updateCurrentUser", (body: PatchUser) => {
            return makeApiRequest<User>("PATCH", "/users/@me", {
                body: body
            })
        })
    }

    export function getUserData() {
        return createProcessor("getUserData", (id: number) => {
            return makeApiRequest<PartialUser>("GET", "/users/{id}", {
                params: { "{id}": id.toString() }
            })
        })
    }

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
                params: { "{id}": groupId.toString() }
            })
        })
    }

    export function updateGroup() {
        return createProcessor("updateGroup", (groupId: number, newData: PatchGroup) => {
            return makeApiRequest<Group>("PATCH", "/groups/{id}", {
                body: newData,
                params: { "{id}": groupId.toString() }
            })
        })
    }

    export function deleteGroup() {
        return createProcessor("deleteGroup", (groupId: number) => {
            return makeApiRequest<{ success: true }>("DELETE", "/groups/{id}", {
                params: { "{id}": groupId.toString() },
            })
        })
    }

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

    export function getUserCheckins() {
        return createProcessor("getUserCheckins", (groupId: number, userId: number, queryParams: CheckinRangeParams, fields?: CheckinFieldFlags) => {
            return makeApiRequest<GroupCheckin[]>("GET", "/groups/{group.id}/users/{user.id}/checkins", {
                params: { "{group.id}": groupId.toString(), "{user.id}": userId.toString() },
                query: { ...queryParams, "fields": fieldsToQueryParameter(fields) }
            })
        })
    }

    export function getUserCheckin() {
        return createProcessor("getUserCheckin", (groupId: number, userId: number, date: string, fields?: CheckinFieldFlags) => {
            return makeApiRequest<GroupCheckin>("GET", "/groups/{group.id}/users/{user.id}/checkins/{date}", {
                params: {"{group.id}": groupId.toString(), "{user.id}": userId.toString(), "{date}": date},
                query: { "fields": fieldsToQueryParameter(fields) }
            })
        })
    }

    export function updateUserCheckin() {
        return createProcessor("updateUserCheckin", (groupId: number, userId: number, date: string, checkin: UpdateGroupCheckin) => {
            return makeApiRequest<GroupCheckin>("PATCH", "/groups/{group.id}/users/{user.id}/checkins/{date}", {
                body: checkin,
                params: { "{group.id}": groupId.toString(), "{user.id}": userId.toString(), "{date}": date }
            })
        })
    }

    export function getGroupCheckins() {
        return createProcessor("getGroupCheckins", (groupId: number, date: string, fields: CheckinFieldFlags) => {
            return makeApiRequest<GroupCheckin[]>("GET", "/groups/{group.id}/checkins/{date}", {
                params: { "{group.id}": groupId.toString(), "{date}": date },
                query: { "fields": fieldsToQueryParameter(fields) }
            })
        })
    }

    export function getGroupCheckinsWithUsers() {
        const getUsers = getGroupUsers()
        const getCheckins = getGroupCheckins()
        return createProcessor("getGroupCheckinsWithUsers", async (groupId: number, date: string, fields: CheckinFieldFlags) => {
            const p1 = getUsers(groupId)
            const p2 = getCheckins(groupId, date, fields)

            const [rUsers, rCheckins] = await Promise.all([p1, p2] as Iterable<Promise<GroupUser[] | GroupCheckin[]>>) as [GroupUser[], GroupCheckin[]]

            return rUsers.map(user => {
                const checkin = rCheckins.find(it => it.user_id == user.user_id) ?? {}
                return { ...user, ...checkin, date: date }
            }) as UserGroupCheckin[]
        })
    }

    export function updateGroupCheckins() {
        return createProcessor("updateGroupCheckins", (groupId: number, date: string, checkins: GroupCheckinsUpdate[]) => {
            return makeApiRequest<GroupCheckin[]>("PATCH", "/groups/{group.id}/checkins/{date}", {
                body: checkins,
                params: { "{group.id}": groupId.toString(), "{date}": date }
            })
        })
    }

    async function makeApiRequest<T>(
        method: RequestMethod, url: String, { params, query, body }: { body?: object, params?: RequestParams, query?: RequestParams } = {}
    ): Promise<T> {
        let actualUrl = API_URL + "/" + url.replace(/^\//, "")
        if (params) {
            for (let paramsKey in params) {
                if (typeof params[paramsKey] !== "string") { continue }
                actualUrl = actualUrl.replace(paramsKey, params[paramsKey] as string)
            }
        }

        if (query) {
            const q: { [key: string]: string } = {}
            for (let queryKey in query) {
                if (typeof query[queryKey] !== "string") { continue }
                q[queryKey] = query[queryKey]!
            }
            let urlParams = new URLSearchParams(q)
            actualUrl = actualUrl + "?"+urlParams.toString()
        }

        const init: RequestInit = { method: method }
        const headers: { [key: string]: string } = {}

        if (body) {
            if (method == "GET") {
                throw new RequestException("Unable to add body to 'GET' request")
            }
            init.body = JSON.stringify(body)
            headers["Content-Type"] = "application/json"
        }

        if (Object.keys(headers).length > 0) {
            init.headers = headers
        }

        return fetch(actualUrl, init)
            .then(async it => {
                if (it.status >= 400) {
                    const json = await it.json()
                    if (!isErrorDto(json)) {
                        throw new ApiError(it.status, "Unkown error")
                    }
                    throw new ApiError(json.status, json)
                }
                const json = await it.json()
                if (isErrorDto(json)) {
                    throw new ApiError(json.status, json)
                }
                return json
            })
            .catch(it => {
                if (it instanceof ApiError) {
                    throw it
                }
                if (it instanceof Error) {
                    throw new ApiError(999, "Unhandled error", it)
                }
                throw new ApiError(999, "Unkown error", it)
            })
    }

    function createProcessor<TParams extends any[], TReturn>(name: String, fn: (...TParams: TParams) => TReturn): MRP<TParams, TReturn> {
        // @ts-ignore
        fn.id = name;
        return fn as MRP<TParams, TReturn>;
    }

    function fieldsToQueryParameter(fields?: CheckinFieldFlags): string | undefined {
        if (!fields) { return undefined }
        const enabledFields: string[] = []
        if (fields.presence === true) { enabledFields.push("presence") }
        if (fields.presence_comment === true) { enabledFields.push("presence_comment") }
        if (fields.checkin_stars === true) { enabledFields.push("checkin_stars") }
        if (fields.checkin_comment === true) { enabledFields.push("checkin_comment") }
        if (fields.checkup_stars === true) { enabledFields.push("checkup_stars") }
        if (fields.checkup_comment === true) { enabledFields.push("checkup_comment") }
        if (fields.checkout_stars === true) { enabledFields.push("checkout_stars") }
        if (fields.checkup_comment === true) { enabledFields.push("checkup_comment") }
        if (fields.obstacle_comment === true) { enabledFields.push("obstacle_comment") }
        return enabledFields.length == 0 ? undefined : enabledFields.join(",")
    }
}