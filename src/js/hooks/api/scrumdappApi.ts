import {ApiError} from "./apiError.ts";
import type {PartialUser, PatchUser, User} from "../../models/user.ts";
import type {CreateGroup, Group, GroupUser, PartialGroup, PatchGroup} from "../../models/group.ts";
import {RequestException} from "./apiError.ts";
import {isErrorDto} from "../../models/dto/errorDto.ts";
import type {UpdateGroupCheckin, GroupCheckin, GroupCheckinsUpdate, UserGroupCheckin, CheckinFieldFlags} from "../../models/checkin.ts";


export namespace ScrumdappApi {

    const API_URL = (import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api").replace(/\/$/, "")

    export type RequestProcessor<Ti extends any[], Tr> = (...inputs: Ti) => Promise<Tr>
    export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
    export type RequestParams = { [key: string]: string | undefined }

    export type CheckinRangeParams = {
        "start_date": string,
        "end_date": string
    }

    export function getCurrentUser(): RequestProcessor<[], User> {
        return (() => {
            return makeApiRequest("GET", "/users/@me")
        })
    }

    export function updateCurrentUser(): RequestProcessor<[PatchUser], User> {
        return ((userBody) => {
            return makeApiRequest("PATCH", "/users/@me", {
                body: userBody
            })
        })
    }

    export function getUserData(): RequestProcessor<[id: number], PartialUser> {
        return ((id) => {
            return makeApiRequest("GET", "/users/{id}", {
                params: { "{id}": id.toString() }
            })
        })
    }

    export function getGroups(): RequestProcessor<[], PartialGroup[]> {
        return (() => {
            return makeApiRequest("GET", "/groups")
        })
    }

    export function createGroup(): RequestProcessor<[CreateGroup], Group> {
        return ((group) => {
            return makeApiRequest("POST", "/groups", {
                body: group
            })
        })
    }

    export function getGroup(): RequestProcessor<[groupId: number], Group> {
        return ((groupId) => {
            return makeApiRequest("GET", "/groups/{id}", {
                params: { "{id}": groupId.toString() }
            })
        })
    }

    export function updateGroup(): RequestProcessor<[groupId: number, newData: PatchGroup], Group> {
        return ((groupId, newData) => {
            return makeApiRequest("PATCH", "/groups/{id}", {
                body: newData,
                params: { "{id}": groupId.toString() }
            })
        })
    }

    export function deleteGroup(): RequestProcessor<[groupId: number], { success: true }> {
        return ((groupId) => {
            return makeApiRequest("DELETE", "/groups/{id}", {
                params: { "{id}": groupId.toString() },
            })
        })
    }

    export function getGroupUsers(): RequestProcessor<[groupId: number], GroupUser[]> {
        return ((groupId) => {
            return makeApiRequest("GET", "/groups/{id}/users", {
                params: { "{id}": groupId.toString() }
            })
        })
    }

    export function addUser(): RequestProcessor<[groupId: number, userId: number], GroupUser> {
        return ((groupId, userId) => {
            return makeApiRequest("POST", "/groups/{id}/users", {
                body: { user_id: userId },
                params: { "{id}": groupId.toString() }
            })
        })
    }

    export function deleteGroupUser(): RequestProcessor<[groupId: number, userId: number], { success: true }> {
        return ((groupId, userId) => {
            return makeApiRequest("DELETE", "/groups/{group.id}/users/{user.id}", {
                params: { "{group.id}": groupId.toString(), "{user.id}": userId.toString() }
            })
        })
    }

    export function getUserCheckins(): RequestProcessor<[groupId: number, userId: number, date: CheckinRangeParams, fields?: CheckinFieldFlags ], GroupCheckin[]> {
        return ((groupId, userId, queryParams, fields) => {
            return makeApiRequest("GET", "/groups/{group.id}/users/{user.id}/checkins", {
                params: { "{group.id}": groupId.toString(), "{user.id}": userId.toString() },
                query: { ...queryParams, "fields": fieldsToQueryParameter(fields) }
            })
        })
    }

    export function getUserCheckin(): RequestProcessor<[groupId: number, userId: number, date: string, fields?: CheckinFieldFlags ], GroupCheckin> {
        return ((groupId, userId, date, fields) => {
            return makeApiRequest("GET", "/groups/{group.id}/users/{user.id}/checkins/{date}", {
                params: {"{group.id}": groupId.toString(), "{user.id}": userId.toString(), "{date}": date},
                query: { "fields": fieldsToQueryParameter(fields) }
            })
        })
    }

    export function updateUserCheckin(): RequestProcessor<[groupId: number, userId: number, date: string, checkin: UpdateGroupCheckin], GroupCheckin> {
        return ((groupId, userId, date, checkin) => {
            return makeApiRequest("PATCH", "/groups/{group.id}/users/{user.id}/checkins/{date}", {
                body: checkin,
                params: { "{group.id}": groupId.toString(), "{user.id}": userId.toString(), "{date}": date }
            })
        })
    }

    export function getGroupCheckins(): RequestProcessor<[groupId: number, date: string, fields: CheckinFieldFlags], GroupCheckin[]> {
        return ((groupId, date, fields) => {
            return makeApiRequest("GET", "/groups/{group.id}/checkins/{date}", {
                params: { "{group.id}": groupId.toString(), "{date}": date },
                query: { "fields": fieldsToQueryParameter(fields) }
            })
        })
    }

    export function getGroupCheckinsWithUsers(): RequestProcessor<[groupId: number, date: string, fields: CheckinFieldFlags], UserGroupCheckin[]> {
        const getUsers = getGroupUsers()
        const getCheckins = getGroupCheckins()
        return (async (groupId, date, fields) => {
            const p1 = getUsers(groupId)
            const p2 = getCheckins(groupId, date, fields)

            const [rUsers, rCheckins] = await Promise.all([p1, p2] as Iterable<Promise<GroupUser[] | GroupCheckin[]>>) as [GroupUser[], GroupCheckin[]]

            return rUsers.map(user => {
                const checkin = rCheckins.find(it => it.user_id == user.user_id) ?? {}
                return { ...user, ...checkin, date: date }
            })
        })
    }

    export function updateGroupCheckins(): RequestProcessor<[groupId: number, date: string, checkins: GroupCheckinsUpdate[]], GroupCheckin[]> {
        return ((groupId, date, checkins) => {
            return makeApiRequest("PATCH", "/groups/{group.id}/checkins/{date}", {
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

        return fetch(actualUrl, {
            method
        })
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