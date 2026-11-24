import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from "chart.js"
import { Line } from "react-chartjs-2"
import { useTranslation } from "react-i18next"
import { chartColors, chartChrome, chartTooltipStyle } from "../../../js/utils/analyticsColors.ts"
import type { MoodPoint } from "../../../js/utils/analyticsUtils.ts"

ChartJS.register(PointElement, LineElement, Tooltip, CategoryScale, LinearScale)

export function MoodTrendBlock({ points, average }: { points: MoodPoint[], average: number | null }) {
    const { t, i18n } = useTranslation()
    const dateLabel = new Intl.DateTimeFormat(i18n.language, { day: "numeric", month: "long" })

    const data = {
        labels: points.map((p) => dateLabel.format(p.date)),
        datasets: [
            {
                data: points.map((p) => p.score),
                borderColor: chartColors.amber,
                backgroundColor: chartColors.amber,
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.25,
                clip: false as const,
            },
            {
                data: points.map(() => average),
                borderColor: chartChrome.axis,
                borderDash: [4, 4],
                borderWidth: 1.5,
                pointRadius: 0,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        // Extra room so points on the min/max gridline are not cut off at the chart edge
        layout: { padding: { top: 8, right: 8 } },
        plugins: {
            legend: { display: false },
            tooltip: {
                ...chartTooltipStyle,
                callbacks: {
                    label: (ctx: { datasetIndex: number, dataIndex: number, raw: unknown }) => ctx.datasetIndex === 0
                        ? `${t("analytics.moodTooltipScore", { score: ctx.raw })} (${points[ctx.dataIndex].sessionName})`
                        : t("analytics.moodTooltipAverage", { score: ctx.raw }),
                },
            },
        },
        scales: {
            x: { grid: { color: chartChrome.grid }, ticks: { color: chartChrome.mutedText } },
            y: {
                min: 0,
                max: 5,
                grid: { color: chartChrome.grid },
                ticks: { color: chartChrome.mutedText, stepSize: 1 },
                title: { display: true, text: t("analytics.moodAxisLabel"), color: chartChrome.mutedText, font: { family: "inherit" } },
            },
        },
    }

    return (
        <>
            {points.length === 0 ? (
                <p className="center flex-1 min-h-56 text-center text-sm text-fg4">{t("analytics.moodEmpty")}</p>
            ) : (
                // Grows with the card so the chart fills the height of the calendar next to it
                <div className="relative flex-1 min-h-72"><Line data={data} options={options} /></div>
            )}
            <div className="horizontal flex-wrap gap-3 mt-4">
                <div className="horizontal items-center gap-1.5 text-xs text-fg4">
                    <span className="size-2.5 flex-none rounded-sm" style={{ backgroundColor: chartColors.amber }} />
                    {t("analytics.moodLegend.score")}
                </div>
                <div className="horizontal items-center gap-1.5 text-xs text-fg4">
                    <span className="inline-block w-3" style={{ borderTop: `2px dashed ${chartChrome.axis}` }} />
                    {t("analytics.moodLegend.average")}
                </div>
            </div>
        </>
    )
}
