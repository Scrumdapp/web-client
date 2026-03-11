import {ApiError} from "./apiError.ts";
import type {User} from "../../models/user.ts";
import type {GroupData, GroupUser} from "../../models/group.ts";
import {RequestException} from "./apiError.ts";
import {isErrorDto} from "../../models/dto/errorDto.ts";


export namespace ScrumdappApi {

    const API_URL = (import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api").replaceAll(/\/$/, "")

    export type RequestProcessor<Ti extends any[], Tr> = (inputs: Ti) => Promise<Tr>
    export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT"
    export type RequestParams = { [key: string]: string }

    export function getCurrentUser(): RequestProcessor<never, User> {
        return (() => {
            return makeApiRequest("GET", "/users/@me")
        })
    }

    export function getUserData(): RequestProcessor<[id: number], User> {
        return (([id]) => {
            return makeApiRequest("GET", "/users/{id}", {}, { "{id}": id.toString() })
        })
    }

    export function getGroupData(): RequestProcessor<[groupId: number], GroupData> {
        return (([groupId]) => {
            return makeApiRequest("GET", "/groups/{id}", {}, { "{id}": groupId.toString() })
        })
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