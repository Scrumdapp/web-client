import { useRef, useState, useEffect } from "react";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  attendanceOptions,
  getAttendanceColorScrummaster,
  getStarsColor,
} from "../../../js/utils/colorUtils.ts";
import { useTranslation } from "react-i18next";
import { cn } from "../../../js/utils/tw.ts";

type AttendanceReadOnlyFieldProps = {
  value?: string | null;
};

type StarsReadOnlyFieldProps = {
  value?: number;
  max?: number;
};

const POINTS_PER_STAR = 2;

function useThemeColor(varName: string): string {
  const [color, setColor] = useState("#928374");

  useEffect(() => {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    if (resolved) setColor(resolved);
  }, [varName]);

  return color;
}

export function StarsReadOnlyField({
  value = 0,
  max = 5,
}: StarsReadOnlyFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorEmpty = useThemeColor("--color-fg4");

  const getStarIcon = (starIndex: number) => {
    const starFullValue = (starIndex + 1) * POINTS_PER_STAR;
    if (value >= starFullValue) return faStarSolid;
    if (value >= starFullValue - 1) return faStarHalfStroke;
    return faStarRegular;
  };

  return (
    <div ref={containerRef} className="flex items-center w-fit">
      {Array.from({ length: max }, (_, i) => i).map((starIndex) => {
        const starFullValue = (starIndex + 1) * POINTS_PER_STAR;
        const isFilled = value >= starFullValue - 1;

        return (
          <button
            key={starIndex}
            type="button"
            className="outline-none"
            aria-label={`Rate ${starIndex + 1} out of ${max}`}
          >
            <span
              className={cn(
                "inline-block transition-transform",
                isFilled ? getStarsColor(value) : colorEmpty,
              )}
            >
              <FontAwesomeIcon icon={getStarIcon(starIndex)} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function AttendanceReadOnlyField({
  value,
}: AttendanceReadOnlyFieldProps) {
  const { t } = useTranslation();

  const currentOption =
    attendanceOptions.find((opt) => opt.value === value) ??
    attendanceOptions[0];
  const currentColor = getAttendanceColorScrummaster(value);
  const isValueSet = value !== null;

  return (
    <span className={`text-left ${currentColor}`}>
      {isValueSet ? t(currentOption.labelKey) : "---"}
    </span>
  );
}
