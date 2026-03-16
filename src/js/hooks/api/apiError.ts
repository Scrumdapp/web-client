import type {ErrorDto} from "../../models/dto/errorDto.ts";
import {isErrorDto} from "../../models/dto/errorDto.ts";

export class RequestException extends Error {
}

export class ApiError extends Error {
    status: number
    detail?: string
    extra?: object

    constructor(status: number, message: string | ErrorDto, cause?: Error) {
        if (isErrorDto(message)) {
            super(message.message)
            this.detail = message.detail
            this.extra = message.extra
        } else {
            super(message)
        }
        this.status = status
        this.name = "ApiError " + status
        this.cause = cause
    }
}