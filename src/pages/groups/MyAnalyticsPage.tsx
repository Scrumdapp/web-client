import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useGroup } from "../../js/context/group/useGroup.ts"
import { StatTile } from "../../components/groups/analytics/StatTile.tsx"
import { AnalyticsCard } from "../../components/groups/analytics/AnalyticsCard.tsx"
import { WeekComparisonDonuts } from "../../components/groups/analytics/WeekComparisonDonuts.tsx"
import { AttendanceCalendarBlock, CheckSelector } from "../../components/groups/analytics/AttendanceCalendarBlock.tsx"
import { MoodTrendBlock } from "../../components/groups/analytics/MoodTrendBlock.tsx"
import { YearlyAttendanceBlock } from "../../components/groups/analytics/YearlyAttendanceBlock.tsx"
import { useAttendanceMonth, useFirstDataMonth, useMonthNavigation, useMoodTrend, usePeriodAttendance, useTrendSummary } from "../../js/hooks/analytics/useMyAnalytics.ts"
import { parseLocalYearMonth } from "../../js/utils/analyticsUtils.ts"

const monthNavBtn = "btn bg-bg1 rounded-full size-7 p-0 disabled:opacity-40 disabled:pointer-events-none"

export function MyAnalyticsPage() {
    const { t, i18n } = useTranslation()
    const group = useGroup()

    const summary = useTrendSummary(group.id)
    const mood = useMoodTrend(group.id)
    const period = usePeriodAttendance(group.id)

    // Calendar
    const month = useMonthNavigation(useFirstDataMonth(group.id))
    const [selectedCheck, setSelectedCheck] = useState<string | null>(null)
    const attendance = useAttendanceMonth(group.id, month.yearMonth)
    const checkNames = attendance.data?.checkNames ?? []
    // A month without the selected check falls back to the first check of that month
    const check = selectedCheck != null && checkNames.includes(selectedCheck) ? selectedCheck : checkNames[0] ?? null
    const monthLabel = new Intl.DateTimeFormat(i18n.language, { month: "long", year: "numeric" }).format(parseLocalYearMonth(month.yearMonth))

    const onTimeNow = summary.data && !summary.data.current.empty ? summary.data.current.onTime : null
    const starsAverage = summary.data?.starsAverage

    return (
        <div className="vertical gap-4">
            <title>{t("analytics.title")}</title>
            <h2>{t("analytics.header")}</h2>

            {/* The 3 stat tiles at the top of the page */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <StatTile
                    label={t("analytics.stats.onTimeRate")}
                    value={onTimeNow ?? "–"}
                    unit={onTimeNow != null ? "%" : undefined}
                    sublabel={t("analytics.stats.onTimeRateTrendSuffix")}
                    trend={summary.data?.trend}
                    trendValue={summary.data?.value}
                />
                <StatTile
                    label={t("analytics.stats.presentThisMonth")}
                    value={summary.data?.presentPct ?? "–"}
                    unit={summary.data ? "%" : undefined}
                    sublabel={summary.data && t("analytics.stats.presentThisMonthSublabelLive", {
                        present: summary.data.presentThisMonth,
                        total: summary.data.totalThisMonth,
                    })}
                />
                <StatTile
                    label={t("analytics.stats.selfReflection")}
                    value={starsAverage?.toLocaleString(i18n.language) ?? "–"}
                    unit={starsAverage != null ? "★" : undefined}
                    sublabel={summary.data && (summary.data.starsCount > 0
                        ? t("analytics.stats.selfReflectionSublabelLive", { count: summary.data.starsCount })
                        : t("analytics.stats.noData"))}
                />
            </div>

            {/* Donut charts */}
            <AnalyticsCard title={t("analytics.onTimeComparison")} subtitle={t("analytics.onTimeSubtitle")} state={summary}>
                {(data) => <WeekComparisonDonuts {...data} />}
            </AnalyticsCard>

            {/* Each card is at least 20rem wide, so on small screens they wrap below each other */}
            <div className="horizontal gap-3.5 flex-wrap items-stretch *:basis-80">
                {/* Calendar */}
                <AnalyticsCard
                    title={<>
                        <button type="button" className={monthNavBtn} disabled={!month.canPrev}
                            onClick={month.prev}
                            aria-label={t("analytics.calendarPrevMonth")}>‹</button>
                        {t("analytics.calendarTitlePrefix")} {check && `${check} `}{monthLabel}
                        <button type="button" className={monthNavBtn} disabled={!month.canNext}
                            onClick={month.next}
                            aria-label={t("analytics.calendarNextMonth")}>›</button>
                    </>}
                    subtitle={t("analytics.calendarSubtitle")}
                    actions={check && <CheckSelector value={check} options={checkNames} onChange={setSelectedCheck} />}
                    state={attendance}
                >
                    {(data) => <AttendanceCalendarBlock {...data} check={check} />}
                </AnalyticsCard>

                {/* Mood chart */}
                <AnalyticsCard title={t("analytics.mood")} subtitle={t("analytics.moodSubtitle")} state={mood}>
                    {(data) => <MoodTrendBlock {...data} />}
                </AnalyticsCard>
            </div>

            {/* Attendance chart */}
            <AnalyticsCard title={t("analytics.yearly")} subtitle={t("analytics.yearlySubtitle")} state={period}>
                {(data) => <YearlyAttendanceBlock {...data} />}
            </AnalyticsCard>
        </div>
    )
}
