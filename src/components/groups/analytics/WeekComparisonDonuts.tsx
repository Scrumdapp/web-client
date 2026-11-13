import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useTranslation } from "react-i18next"
import { chartColors, chartChrome, chartTooltipStyle } from "../../../js/utils/analyticsColors.ts"
import type { DateRange, OnTimeSplit } from "../../../js/utils/analyticsUtils.ts"
import { Legend } from "./AnalyticsCard.tsx"

ChartJS.register(ArcElement, Tooltip)

const colors = [chartColors.olive, chartColors.coral, chartColors.gray]

const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
        tooltip: {
            ...chartTooltipStyle,
            callbacks: { label: (ctx: { label: string, raw: unknown }) => `${ctx.label}: ${ctx.raw}%` },
        },
    },
}

interface Props {
    weeks: { previous: DateRange, current: DateRange }
    previous: OnTimeSplit
    current: OnTimeSplit
}

export function WeekComparisonDonuts({ weeks, previous, current }: Props) {
    const { t, i18n } = useTranslation()
    const labels = ["yes", "no", "unknown"].map((key) => t(`analytics.onTimeLegend.${key}`))
    const shortDate = new Intl.DateTimeFormat(i18n.language, { day: "numeric", month: "short" })

    const donuts = [
        { key: "previous", range: weeks.previous, split: previous },
        { key: "current", range: weeks.current, split: current },
    ]

    return (
        <>
            <div className="horizontal gap-4">
                {donuts.map(({ key, range, split }) => {
                    const values = [split.onTime, split.notOnTime, split.unknown]
                    return (
                        <div className="vertical flex-1 min-w-0 items-center gap-2" key={key}>
                            <p className="text-xs font-semibold uppercase tracking-wide text-fg4">{t(`analytics.week.${key}`)}</p>
                            <p className="muted -mt-1.5">{shortDate.formatRange(range.start, range.end)}</p>
                            <div className="relative w-full max-w-64 aspect-square mx-auto">
                                {split.empty ? (
                                    <div className="center absolute inset-0 rounded-full border-2 border-dashed border-bg2 p-4 text-center text-sm text-fg4">{t("analytics.noCheckins")}</div>
                                ) : (
                                    <Doughnut
                                        data={{
                                            labels,
                                            datasets: [{ data: values, backgroundColor: colors, borderColor: chartChrome.card, borderWidth: 2 }],
                                        }}
                                        options={options}
                                        role="img"
                                        aria-label={`${t(`analytics.week.${key}`)}: ${labels.map((l, i) => `${l} ${values[i]}%`).join(", ")}`}
                                    />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Legend className="justify-center mt-4" items={labels.map((label, i) => ({ label, color: colors[i] }))} />
        </>
    )
}
