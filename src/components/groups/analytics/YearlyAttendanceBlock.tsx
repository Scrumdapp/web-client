import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"
import { useTranslation } from "react-i18next"
import { chartColors, chartChrome, chartTooltipStyle } from "../../../js/utils/analyticsColors.ts"
import type { PeriodBar } from "../../../js/utils/analyticsUtils.ts"
import { Legend } from "./AnalyticsCard.tsx"

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale)

const series = [
    { key: "present", color: chartColors.olive },
    { key: "sick", color: chartColors.gray },
    { key: "absent", color: chartColors.coral },
] as const

export function YearlyAttendanceBlock({ bars, empty }: { bars: PeriodBar[], empty: boolean }) {
    const { t, i18n } = useTranslation()
    const shortDate = new Intl.DateTimeFormat(i18n.language, { day: "numeric", month: "short" })

    const data = {
        labels: bars.map((bar) => shortDate.formatRange(bar.start, bar.end)),
        // The border in the card color keeps stacked segments apart without relying on color
        datasets: series.map(({ key, color }) => ({
            label: t(`analytics.calendarLegend.${key}`),
            data: bars.map((bar) => bar[key]),
            backgroundColor: color,
            borderColor: chartChrome.card,
            borderWidth: 2,
            borderSkipped: false,
            borderRadius: key === "present" ? 4 : 0,
        })),
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: chartTooltipStyle },
        scales: {
            x: { stacked: true, grid: { display: false }, ticks: { color: chartChrome.mutedText } },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: { color: chartChrome.grid },
                ticks: { color: chartChrome.mutedText, precision: 0 },
                title: { display: true, text: t("analytics.yearlyAxisLabel"), color: chartChrome.mutedText, font: { family: "inherit" } },
            },
        },
    }

    return (
        <>
            <Legend className="mb-4" items={series.map(({ key, color }) => ({ label: t(`analytics.calendarLegend.${key}`), color }))} />
            {empty ? (
                <p className="center h-56 text-center text-sm text-fg4">{t("analytics.yearlyEmpty")}</p>
            ) : (
                <div className="h-56"><Bar data={data} options={options} /></div>
            )}
        </>
    )
}
