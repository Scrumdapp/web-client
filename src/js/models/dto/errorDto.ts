

export interface ErrorDto {
    error: true
    status: number
    message: string
    detail: string
    extra?: object
}

export function isErrorDto(obj: any): obj is ErrorDto {
    if (!obj.hasOwnProperty("message")) return false
    if (typeof obj.message !== "string") return false
    return true
}