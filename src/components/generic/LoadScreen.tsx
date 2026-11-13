import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";
import type { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";

export function LoadScreen({ size = "2x" }: { size?: SizeProp }) {
  const { t } = useTranslation();
  return (
    <div className="center fade-in" role="status">
      <FontAwesomeIcon
        icon={faHourglass}
        size={size}
        className="loading-spinner"
      />
      <span className="sr-only">{t("a11y.loading")}</span>
    </div>
  );
}
