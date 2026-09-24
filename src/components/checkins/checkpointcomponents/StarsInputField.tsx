import { useRef, useState, useEffect } from "react";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStarsColor } from "../../../js/utils/colorUtils.ts";

type StarsInputFieldProps = {
  value?: number | null;
  onChange?: (value: number) => void;
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

export function StarsInputField({
  value = null,
  onChange,
  max = 5,
}: StarsInputFieldProps) {
  const [localValue, setLocalValue] = useState<number | null>(value);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorEmpty = useThemeColor("--color-fg4");

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const displayValue = hoverValue ?? localValue ?? 0;

  const updateValue = (newValue: number) => {
    setLocalValue(newValue);
    if (onChange != null) {
      onChange(newValue);
    }
  };

  const getValueFromEvent = (
    e: React.MouseEvent<HTMLButtonElement>,
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

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-1 w-fit"
      onMouseLeave={() => setHoverValue(null)}
    >
      {Array.from({ length: max }, (_, i) => i).map((starIndex) => {
        const starFullValue = (starIndex + 1) * POINTS_PER_STAR;
        const isFilled = displayValue >= starFullValue - 1;

        return (
          <button
            key={starIndex}
            type="button"
            className="cursor-pointer text-2xl focus:outline-none"
            onMouseMove={(e) => setHoverValue(getValueFromEvent(e, starIndex))}
            onClick={(e) => updateValue(getValueFromEvent(e, starIndex))}
            aria-label={`Rate ${starIndex + 1} out of ${max}`}
          >
            <span
              className={`inline-block transition-transform hover:scale-110 ${isFilled ? getStarsColor(displayValue) : colorEmpty}`}
            >
              <FontAwesomeIcon icon={getStarIcon(starIndex)} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
