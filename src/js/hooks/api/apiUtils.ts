import { isErrorDto } from "../../models/dto/errorDto.ts";
import { ApiError, RequestException } from "./apiError.ts";


export const API_URL = (import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api").replace(/\/$/, "")

export type RequestProcessor<Ti extends any[], Tr> = MRP<Ti, Promise<Tr>>
export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
export type RequestParams = { [key: string]: string | number | undefined }

export type MRP<Ti extends any[], Tr> = ((...inputs: Ti) => Tr) & { id: string }

export interface DateRangeParams {
    "start_date": string,
    "end_date": string
}

export type GetCheckpointQueryOptions = { range: DateRangeParams } | { date: string }

export async function makeApiRequest<T>(
    method: RequestMethod, url: String, { params, query, body }: { body?: object, params?: RequestParams, query?: RequestParams } = {}
): Promise<T> {
    let actualUrl = API_URL + "/" + url.replace(/^\//, "")
    if (params) {
        for (let paramsKey in params) {
            actualUrl = actualUrl.replace(paramsKey, params[paramsKey] as string)
        }
    }

    if (query) {
        const q: { [key: string]: string } = {}
        for (let queryKey in query) {
            const v = query[queryKey]

            if (v === undefined) { continue }

            if (typeof v === "string" || typeof v === "number") {
                q[queryKey] = String(v)
            }
        }
        let urlParams = new URLSearchParams(q)
        actualUrl = actualUrl + "?" + urlParams.toString()
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
            if (it.status == 204) return null
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

export function createProcessor<TParams extends any[], TReturn>(name: String, fn: (...TParams: TParams) => TReturn): MRP<TParams, TReturn> {
    // @ts-ignore
    fn.id = name;
    return fn as MRP<TParams, TReturn>;
}
