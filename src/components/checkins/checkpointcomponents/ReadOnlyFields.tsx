import { useRef, useState, useEffect } from "react";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { interpolateColor } from "../../../js/utils/starsMath.ts";
import {
  attendanceOptions,
  getAttendanceColorScrummaster,
} from "../../../js/utils/colorUtils.ts";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const colorLow = useThemeColor("--color-red");
  const colorMid = useThemeColor("--color-green");
  const colorHigh = useThemeColor("--color-blue");
  const colorEmpty = useThemeColor("--color-fg4");

  const maxValue = max * POINTS_PER_STAR;

  const midpoint = maxValue / 2;
  const activeColor =
    value <= midpoint
      ? interpolateColor(value / midpoint, colorLow, colorMid)
      : interpolateColor((value - midpoint) / midpoint, colorMid, colorHigh);

  const getStarIcon = (starIndex: number) => {
    const starFullValue = (starIndex + 1) * POINTS_PER_STAR;
    if (value >= starFullValue) return faStarSolid;
    if (value >= starFullValue - 1) return faStarHalfStroke;
    return faStarRegular;
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={t("a11y.checkpoint.rating", {
        value: (value / POINTS_PER_STAR).toLocaleString(i18n.language),
        max,
      })}
      className="flex items-center w-fit"
    >
      {Array.from({ length: max }, (_, i) => i).map((starIndex) => {
        const starFullValue = (starIndex + 1) * POINTS_PER_STAR;
        const isFilled = value >= starFullValue - 1;

        return (
          <span key={starIndex} aria-hidden="true">
            <span
              className="inline-block transition-transform"
              style={{ color: isFilled ? activeColor : colorEmpty }}
            >
              <FontAwesomeIcon icon={getStarIcon(starIndex)} />
            </span>
          </span>
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
