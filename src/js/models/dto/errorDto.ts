export interface ErrorDto {
  status: number;
  code: string;
  titleTranslationKey: string;
  descriptionTranslationKey: string;
  errors?: Array<{ field: string; translationKey: string }>;
}

export function isErrorDto(obj: any): obj is ErrorDto {
  if (!obj.hasOwnProperty("code")) return false;
  if (!obj.hasOwnProperty("titleTranslationKey")) return false;
  if (typeof obj.titleTranslationKey !== "string") return false;
  if (!obj.hasOwnProperty("descriptionTranslationKey")) return false;
  if (typeof obj.descriptionTranslationKey !== "string") return false;
  return true;
}
