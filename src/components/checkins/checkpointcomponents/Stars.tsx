import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons/faStar";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons/faStar";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

type StarsProps = {
  amount?: number | null;
  className?: string;
};

export function Stars({ amount, className }: StarsProps) {
  const { t, i18n } = useTranslation();

  if (amount == null) {
    return (
      <span className={className}>
        <span className="text-gray" aria-hidden="true">
          ---
        </span>
        <span className="sr-only">{t("a11y.checkpoint.noRating")}</span>
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={t("a11y.checkpoint.rating", {
        value: (amount / 2).toLocaleString(i18n.language),
        max: 5,
      })}
      className={`stars flex-wrap${className ? ` ${className}` : ""}`}
    >
      {[1, 2, 3, 4, 5].map((starPosition) => {
        const iconName =
          (starPosition - 1) * 2 + 1 > amount
            ? faStarOutline
            : starPosition * 2 > amount
              ? faStarHalfStroke
              : faStarSolid;

        const isEmpty = iconName === faStarOutline;

        return (
          <FontAwesomeIcon
            key={starPosition}
            icon={iconName}
            className={`icon${isEmpty ? " text-fg4" : ""}`}
          />
        );
      })}
    </span>
  );
}

export default Stars;
