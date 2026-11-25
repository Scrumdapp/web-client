import { memo } from "react";
import { useTranslation } from "react-i18next";

type FieldError = {
  field: string;
  translationKey: string;
};

const FieldApiErrorMessage = memo(
  ({
    errors,
    field,
    id,
  }: {
    errors: FieldError[] | null;
    field: string;
    id?: string;
  }) => {
    const { t } = useTranslation();

    return (
      errors?.some((err) => err.field === field) && (
        <p id={id} role="alert" className="text-red text-sm -mt-1 mb-2">
          {t(errors.find((err) => err.field === field)!.translationKey)}
        </p>
      )
    );
  },
);
const FieldApiErrorMessageList = memo(
  ({ errors }: { errors: FieldError[] | null }) => {
    const { t } = useTranslation();

    return (
      <ul role="alert" className="text-red list-disc list-inside text-sm mb-2">
        {errors?.map((err, idx) => (
          <li key={idx}>{t(err.translationKey)}</li>
        ))}
      </ul>
    );
  },
);

export function hasFieldError(
  errors: FieldError[] | null | undefined,
  field: string,
) {
  return errors?.some((err) => err.field === field) ?? false;
}

export { FieldApiErrorMessage, FieldApiErrorMessageList };
