import type { ErrorDto } from "../../models/dto/errorDto.ts";
import { isErrorDto } from "../../models/dto/errorDto.ts";

export class RequestException extends Error {}

export class ApiError extends Error {
  status: number;
  code: string;
  titleTranslationKey: string;
  descriptionTranslationKey: string;

  constructor(status: number, message: string | ErrorDto, cause?: Error) {
    if (isErrorDto(message)) {
      super(message.code);
      this.code = message.code;
      this.titleTranslationKey = message.titleTranslationKey;
      this.descriptionTranslationKey = message.descriptionTranslationKey;
    } else {
      super(message);
      this.code = "UNKNOWN_ERROR";
      this.titleTranslationKey = "error.generic.unknown.title";
      this.descriptionTranslationKey = "error.generic.unknown.description";
    }
    this.status = status;
    this.name = "ApiError " + status;
    this.cause = cause;
  }
}
