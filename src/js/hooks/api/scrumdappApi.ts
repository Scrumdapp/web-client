import {ApiError} from "./apiError.ts";
import type {PartialUser, PatchUser, User} from "../../models/user.ts";
import type {CreateGroup, Group, GroupCheckin, GroupUser, PartialGroup, PatchGroup} from "../../models/group.ts";
import {RequestException} from "./apiError.ts";
import {isErrorDto} from "../../models/dto/errorDto.ts";


export namespace ScrumdappApi {

    const API_URL = (import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api").replaceAll(/\/$/, "")

    export type RequestProcessor<Ti extends any[], Tr> = (inputs: Ti) => Promise<Tr>
    export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
    export type RequestParams = { [key: string]: string }

    export function getCurrentUser(): RequestProcessor<never, User> {
        return (() => {
            return makeApiRequest("GET", "/users/@me")
        })
    }

    export function updateCurrentUser(): RequestProcessor<[PatchUser], User> {
        return ((userBody) => {
            return makeApiRequest("PATCH", "/users/@me", userBody)
        })
    }

    export function getUserData(): RequestProcessor<[id: number], PartialUser> {
        return (([id]) => {
            return makeApiRequest("GET", "/users/{id}", {}, { "{id}": id.toString() })
        })
    }

    export function getGroups(): RequestProcessor<never, PartialGroup[]> {
        return (() => {
            return makeApiRequest("GET", "/groups")
        })
    }

    export function createGroup(): RequestProcessor<[CreateGroup], Group> {
        return (([group]) => {
            return makeApiRequest("POST", "/groups", group)
        })
    }

    export function getGroup(): RequestProcessor<[groupId: number], Group> {
        return (([groupId]) => {
            return makeApiRequest("GET", "/groups/{id}", {}, { "{id}": groupId.toString() })
        })
    }

    export function updateGroup(): RequestProcessor<[groupId: number, newData: PatchGroup], Group> {
        return (([groupId, newData]) => {
            return makeApiRequest("PATCH", "/groups/{id}", newData, { "{id}": groupId.toString() })
        })
    }

    export function deleteGroup(): RequestProcessor<[groupId: number], { success: true }> {
        return (([groupId]) => {
            return makeApiRequest("DELETE", "/groups/{id}")
        })
    }

    export function getGroupUsers(): RequestProcessor<[groupId: number], GroupUser[]> {
        return (([groupId]) => {
            return makeApiRequest("GET", "/groups/{id}/users", {}, { "{id}": groupId.toString() })
        })
    }

    export function addUser(): RequestProcessor<[groupId: number, userId: number], GroupUser> {
        return (([groupId, userId]) => {
            return makeApiRequest("GET", "/groups/{id}/users", { user_id: userId }, { "{id}": groupId.toString() })
        })
    }

    export function deleteGroupUser(): RequestProcessor<[groupId: number, userId: number], { success: true }> {
        return (([groupId, userId]) => {
            return makeApiRequest("GET", "/groups/{id}/users/{user.id}", { user_id: userId }, { "{id}": groupId.toString() })
        })
    }

    export function getUserCheckins(): RequestProcessor<[groupId: number, userId: number, ], GroupCheckin[]>

    async function makeApiRequest<T>(
        method: RequestMethod, url: String, body?: object, params?: RequestParams
    ): Promise<T> {
        let actualUrl = API_URL + "/" + url.replace(/^\//, "")
        if (params) {
            for (let paramsKey in params) {
                actualUrl = actualUrl.replace(paramsKey, params[paramsKey])
            }
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

        if (Object.keys(headers) > 0) {
            init.headers = headers
        }

        return fetch(url, {
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
}