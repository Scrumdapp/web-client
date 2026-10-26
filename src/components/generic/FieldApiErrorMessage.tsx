import { memo } from "react";
import { useTranslation } from "react-i18next";

type FieldError = {
  field: string;
  translationKey: string;
};

const FieldApiErrorMessage = memo(
  ({ errors, field }: { errors: FieldError[] | null; field: string }) => {
    const { t } = useTranslation();

    return (
      errors?.some((err) => err.field === field) && (
        <p className="text-red text-sm -mt-1 mb-2">
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
      <ul className="text-red list-disc list-inside text-sm mb-2">
        {errors?.map((err, idx) => (
          <li key={idx}>{t(err.translationKey)}</li>
        ))}
      </ul>
    );
  },
);

export { FieldApiErrorMessage, FieldApiErrorMessageList };
