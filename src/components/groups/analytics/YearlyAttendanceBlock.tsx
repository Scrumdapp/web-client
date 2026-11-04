import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js"
import { Bar } from "react-chartjs-2"
import { useTranslation } from "react-i18next"
import { chartColors, chartChrome, chartTooltipStyle } from "../../../js/utils/analyticsColors.ts"
import { MonthTotals, parseLocalYearMonth } from "../../../js/utils/analyticsUtils.ts"
import { Legend } from "./AnalyticsCard.tsx"

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale)

const series = [
    { key: "present", color: chartColors.olive },
    { key: "sick", color: chartColors.gray },
    { key: "absent", color: chartColors.coral },
] as const

/** `months` with null values = no data for that month (e.g. in the future), not 0. */
export function YearlyAttendanceBlock({ months, empty }: { months: MonthTotals[], empty: boolean }) {
    const { t, i18n } = useTranslation()
    const shortMonth = new Intl.DateTimeFormat(i18n.language, { month: "short" })

    const data = {
        labels: months.map((m) => shortMonth.format(parseLocalYearMonth(m.yearMonth))),
        // the border in the card color keeps stacked segments apart without relying on color
        datasets: series.map(({ key, color }) => ({
            label: t(`analytics.calendarLegend.${key}`),
            data: months.map((m) => m[key]),
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
