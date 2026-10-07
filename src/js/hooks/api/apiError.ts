import type { ErrorDto } from "../../models/dto/errorDto.ts";
import { isErrorDto } from "../../models/dto/errorDto.ts";

export class RequestException extends Error {}

export class ApiError extends Error {
  status: number;
  code: string;
  titleTranslationKey: string;
  descriptionTranslationKey: string;
  errors?: Array<{ field: string; translationKey: string }>;

  constructor(status: number, message: string | ErrorDto, cause?: Error) {
    if (isErrorDto(message)) {
      super(message.code);
      this.code = message.code;
      this.titleTranslationKey = message.titleTranslationKey;
      this.descriptionTranslationKey = message.descriptionTranslationKey;
      this.errors = message.errors;
    } else {
      super(message);
      this.code = "UNKNOWN_ERROR";
      this.titleTranslationKey = "errors.generic.unknown.title";
      this.descriptionTranslationKey = "errors.generic.unknown.description";
    }
    this.status = status;
    this.name = "ApiError " + status;
    this.cause = cause;
  }
}
