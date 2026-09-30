import { useTranslation } from "react-i18next";
import type { ApiError } from "../../js/hooks/api/apiError.ts";

export function ErrorScreen({ error }: { error: ApiError }) {
  const { t } = useTranslation();
  return (
    <div className="center fade-in">
      <h2>
        <strong>{t(error.titleTranslationKey)}</strong>
      </h2>
      <p>{t(error.descriptionTranslationKey)}</p>
    </div>
  );
}
