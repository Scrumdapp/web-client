import type { Trend } from "../../../js/utils/analyticsUtils.ts"
import { chartColors } from "../../../js/utils/analyticsColors.ts"

interface StatTileProps {
    label: string
    value: string | number
    unit?: string
    sublabel?: string | null
    trend?: Trend
    trendValue?: string
}

const trendColor: Record<Trend, string> = { up: chartColors.olive, down: chartColors.coral, flat: chartColors.gray }
const trendIcon = { up: "☀️", down: "🌧️", flat: "☁️" }

// Trend is always icon + colored value together.
export function StatTile({ label, value, unit, sublabel, trend, trendValue }: StatTileProps) {
    return (
        <div className="card flex-1 min-w-40">
            <p className="muted font-bold uppercase tracking-wider mb-2.5">{label}</p>
            <p className="text-3xl font-bold leading-none tabular-nums">
                {value}
                {unit && <span className="text-xl text-fg4">{unit}</span>}
            </p>
            {(trend || sublabel) && (
                <p className="mt-2 text-sm text-fg4">
                    {trend && <>
                        <span aria-hidden="true">{trendIcon[trend]}</span>{" "}
                        <span className="font-extrabold" style={{ color: trendColor[trend] }}>{trendValue}</span>{" "}
                    </>}
                    {sublabel}
                </p>
            )}
        </div>
    )
}
