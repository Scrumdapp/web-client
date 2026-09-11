import { useEffect, useRef, useState } from "react";
import { faStar as faStarSolid, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type StarsRatingProps = {
    value?: number | null;
    onChange?: (value: number | null) => void;
    max?: number;
};

function hexToRgb(hex: string): [number, number, number] {
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function interpolateColor(t: number, from: string, to: string): string {
    const clampedT = Math.min(1, Math.max(0, t));
    const [r1, g1, b1] = hexToRgb(from);
    const [r2, g2, b2] = hexToRgb(to);
    const r = Math.round(lerp(r1, r2, clampedT));
    const g = Math.round(lerp(g1, g2, clampedT));
    const b = Math.round(lerp(b1, b2, clampedT));
    return `rgb(${r}, ${g}, ${b})`;
}

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

export function StarsRating({ value, onChange, max = 5 }: StarsRatingProps) {
    const [localValue, setLocalValue] = useState<number | null>(value ?? null);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const colorLow = useThemeColor("--color-red");
    const colorMid = useThemeColor("--color-green");
    const colorHigh = useThemeColor("--color-blue");
    const colorEmpty = useThemeColor("--color-fg4");

    useEffect(() => {
        setLocalValue(value ?? null);
    }, [value]);

    const resolvedValue = value !== undefined ? (value ?? null) : localValue;
    const displayValue = hoverValue ?? resolvedValue ?? 0;

    const midpoint = max / 2;
    const activeColor =
        displayValue <= midpoint
            ? interpolateColor(displayValue / midpoint, colorLow, colorMid)
            : interpolateColor((displayValue - midpoint) / midpoint, colorMid, colorHigh);

    const updateValue = (newValue: number) => {
        setLocalValue(newValue);
        if (onChange != null) {
            onChange(newValue);
        }
    };

    const getValueFromEvent = (
        e: React.MouseEvent<HTMLButtonElement>,
        starIndex: number
    ): number => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const isLeftHalf = relativeX < rect.width / 2;
        return starIndex + (isLeftHalf ? 0.5 : 1);
    };

    const getStarIcon = (starIndex: number) => {
        const starPosition = starIndex + 1;
        if (displayValue >= starPosition) return faStarSolid;
        if (displayValue >= starPosition - 0.5) return faStarHalfStroke;
        return faStarRegular;
    };

    return (
        <div
            ref={containerRef}
            className="flex items-center gap-1"
            onMouseLeave={() => setHoverValue(null)}
        >
            {Array.from({ length: max }, (_, i) => i).map((starIndex) => {
                const starPosition = starIndex + 1;
                const isFilled = displayValue >= starPosition - 0.5;

                return (
                    <button
                        key={starIndex}
                        type="button"
                        className="cursor-pointer text-2xl transition-transform hover:scale-110"
                        style={{ color: isFilled ? activeColor : colorEmpty }}
                        onMouseMove={(e) => setHoverValue(getValueFromEvent(e, starIndex))}
                        onClick={(e) => updateValue(getValueFromEvent(e, starIndex))}
                        aria-label={`Rate ${starIndex + 1} out of ${max}`}
                    >
                        <FontAwesomeIcon icon={getStarIcon(starIndex)} />
                    </button>
                );
            })}
        </div>
    );
}