import { useTranslation } from "react-i18next";
import type { ApiError } from "../../js/hooks/api/apiError.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export function ErrorScreen({ error }: { error: ApiError }) {
  const { t } = useTranslation();
  return (
    <div className="center fade-in">
      <div className="flex w-20 h-20 items-center justify-center border rounded-full mb-8">
        <FontAwesomeIcon icon={faTriangleExclamation} size={"2x"} />
      </div>

      <h2>
        <strong>{t(error.titleTranslationKey)}</strong>
      </h2>
      <p>{t(error.descriptionTranslationKey)}</p>
    </div>
  );
}
