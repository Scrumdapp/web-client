import { useEffect, useState, KeyboardEvent, MouseEvent } from "react";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStarsColor } from "../../../js/utils/colorUtils.ts";
import { useTranslation } from "react-i18next";

type StarsInputFieldProps = {
  value?: number | null;
  onChange?: (value: number) => void;
  max?: number;
  labelId?: string;
  describedBy?: string;
};

const POINTS_PER_STAR = 2;

export function StarsInputField({
  value = null,
  onChange,
  max = 5,
  labelId,
  describedBy,
}: StarsInputFieldProps) {
  const { t, i18n } = useTranslation();
  const [localValue, setLocalValue] = useState<number | null>(value);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const maxValue = max * POINTS_PER_STAR;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const displayValue = hoverValue ?? localValue ?? 0;

  const updateValue = (newValue: number) => {
    const clamped = Math.min(maxValue, Math.max(0, newValue));
    setLocalValue(clamped);
    onChange?.(clamped);
  };

  const getValueFromEvent = (
    e: MouseEvent<HTMLSpanElement>,
    starIndex: number,
  ): number => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const isLeftHalf = relativeX < rect.width / 2;
    return starIndex * POINTS_PER_STAR + (isLeftHalf ? 1 : 2);
  };

  const getStarIcon = (starIndex: number) => {
    const starFullValue = (starIndex + 1) * POINTS_PER_STAR;
    if (displayValue >= starFullValue) return faStarSolid;
    if (displayValue >= starFullValue - 1) return faStarHalfStroke;
    return faStarRegular;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = localValue ?? 0;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = current + 1;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = current - 1;
        break;
      case "PageUp":
        next = current + POINTS_PER_STAR;
        break;
      case "PageDown":
        next = current - POINTS_PER_STAR;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = maxValue;
        break;
    }
    if (next == null) return;
    e.preventDefault();
    updateValue(next);
  };

  const valueText =
    localValue == null
      ? t("a11y.checkpoint.noRating")
      : t("a11y.checkpoint.rating", {
          value: (localValue / POINTS_PER_STAR).toLocaleString(i18n.language),
          max,
        });

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={localValue ?? 0}
      aria-valuetext={valueText}
      onKeyDown={handleKeyDown}
      className="flex items-center gap-1 w-fit rounded-md"
      onMouseLeave={() => setHoverValue(null)}
    >
      {Array.from({ length: max }, (_, i) => i).map((starIndex) => {
        const starFullValue = (starIndex + 1) * POINTS_PER_STAR;
        const isFilled = displayValue >= starFullValue - 1;

        return (
          <span
            key={starIndex}
            aria-hidden="true"
            className="cursor-pointer text-2xl"
            onMouseMove={(e) => setHoverValue(getValueFromEvent(e, starIndex))}
            onClick={(e) => updateValue(getValueFromEvent(e, starIndex))}
          >
            <span
              className={`inline-block transition-transform hover:scale-110 ${isFilled ? getStarsColor(displayValue) : "text-fg4"}`}
            >
              <FontAwesomeIcon icon={getStarIcon(starIndex)} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
