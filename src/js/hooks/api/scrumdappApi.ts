import {ApiError} from "./apiError.ts";
import type {User} from "../../models/user.ts";
import type {GroupUser} from "../../models/group.ts";
import {RequestException} from "./apiError.ts";
import {isErrorDto} from "../../models/dto/errorDto.ts";


export namespace ScrumdappApi {

    const API_URL = (import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api").replaceAll(/\/$/, "")

    export type RequestProcessor<Ti = [], Tr> = (inputs: Ti) => Promise<Tr>
    export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT"
    export type RequestParams = { [key: string]: string }

    export function getCurrentUser() {
        return (() => {
            return makeApiRequest<User>("GET", "/users/@me")
        }) as RequestProcessor<[], User>
    }

    export function getUserData() {
        return (([id]) => {
            return makeApiRequest<User>("GET", "/users/{id}", {}, { "{id}": id.toString() })
        }) as RequestProcessor<[id: number], User>
    }

    export function getGroupData() {
        return (([groupId]) => {
            return makeApiRequest<GroupUser>("GET", "/groups/{id}", {}, { "{id}": groupId.toString() })
        }) as RequestProcessor<[groupId: number], GroupUser>
    }

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