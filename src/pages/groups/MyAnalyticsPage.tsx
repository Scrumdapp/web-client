import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useGroup } from "../../js/context/group/useGroup.ts"
import { useUser } from "../../js/context/user/useUser.ts"
import { StatTile } from "../../components/groups/analytics/StatTile.tsx"
import { AnalyticsCard } from "../../components/groups/analytics/AnalyticsCard.tsx"
import { SprintComparisonDonuts } from "../../components/groups/analytics/SprintComparisonDonuts.tsx"
import { AttendanceCalendarBlock, DailyCheckSwitch } from "../../components/groups/analytics/AttendanceCalendarBlock.tsx"
import { MoodTrendBlock } from "../../components/groups/analytics/MoodTrendBlock.tsx"
import { YearlyAttendanceBlock } from "../../components/groups/analytics/YearlyAttendanceBlock.tsx"
import { useAttendanceMonth, useMonthNavigation, useMoodTrend, useOnTimeComparison, useYearlyAttendance } from "../../js/hooks/analytics/useMyAnalytics.ts"
import { DailyCheck, parseLocalYearMonth } from "../../js/utils/analyticsUtils.ts"

const monthNavBtn = "btn bg-bg1 rounded-full size-7 p-0 disabled:opacity-40 disabled:pointer-events-none"

export function MyAnalyticsPage() {
    const { t, i18n } = useTranslation()
    const group = useGroup()
    const user = useUser()

    const onTime = useOnTimeComparison(group.id, user.id)
    const mood = useMoodTrend(group.id, user.id)
    const yearly = useYearlyAttendance(group.id, user.id)

    // calendar
    const month = useMonthNavigation(yearly.data?.firstMonth)
    const [check, setCheck] = useState<DailyCheck>("standup")
    const attendance = useAttendanceMonth(group.id, user.id, month.yearMonth)
    const monthLabel = new Intl.DateTimeFormat(i18n.language, { month: "long", year: "numeric" }).format(parseLocalYearMonth(month.yearMonth))

    const onTimeNow = onTime.data && !onTime.data.current.empty ? onTime.data.current.onTime : null
    const moodAverage = mood.data?.average

    return (
        <div className="vertical gap-4">
            <title>{t("analytics.title")}</title>
            <h2>{t("analytics.header")}</h2>

            {/* the 3 stat tiles at the top of the page */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <StatTile
                    label={t("analytics.stats.onTimeRate")}
                    value={onTimeNow ?? "–"}
                    unit={onTimeNow != null ? "%" : undefined}
                    sublabel={t("analytics.stats.onTimeRateTrendSuffix")}
                    trend={onTime.data?.trend}
                    trendValue={onTime.data?.value}
                />
                <StatTile
                    label={t("analytics.stats.presentThisMonth")}
                    value={yearly.data?.presentPct ?? "–"}
                    unit={yearly.data ? "%" : undefined}
                    sublabel={yearly.data && t("analytics.stats.presentThisMonthSublabelLive", {
                        present: yearly.data.presentThisMonth,
                        total: yearly.data.workdaysThisMonth,
                    })}
                />
                <StatTile
                    label={t("analytics.stats.selfReflection")}
                    value={moodAverage?.toLocaleString(i18n.language) ?? "–"}
                    unit={moodAverage != null ? "★" : undefined}
                    sublabel={mood.data && (mood.data.count > 0
                        ? t("analytics.stats.selfReflectionSublabelLive", { count: mood.data.count })
                        : t("analytics.stats.noData"))}
                />
            </div>

            {/* donut charts */}
            <AnalyticsCard title={t("analytics.onTimeComparison")} subtitle={t("analytics.onTimeSubtitle")} state={onTime}>
                {(data) => <SprintComparisonDonuts {...data} />}
            </AnalyticsCard>

            <div className="horizontal gap-3.5 flex-wrap items-stretch">
                {/* calendar */}
                <AnalyticsCard
                    title={<>
                        <button type="button" className={monthNavBtn} disabled={!month.canPrev}
                            onClick={month.prev}
                            aria-label={t("analytics.calendarPrevMonth")}>‹</button>
                        {t("analytics.calendarTitlePrefix")} — {t(check === "standup" ? "analytics.calendarStandup" : "analytics.calendarCheckup")} {monthLabel}
                        <button type="button" className={monthNavBtn} disabled={!month.canNext}
                            onClick={month.next}
                            aria-label={t("analytics.calendarNextMonth")}>›</button>
                    </>}
                    subtitle={t("analytics.calendarSubtitle")}
                    actions={<DailyCheckSwitch value={check} onChange={setCheck} />}
                    state={attendance}
                >
                    {(data) => <AttendanceCalendarBlock {...data} check={check} />}
                </AnalyticsCard>

                {/* mood chart */}
                <AnalyticsCard title={t("analytics.mood")} subtitle={t("analytics.moodSubtitle")} state={mood}>
                    {(data) => <MoodTrendBlock {...data} />}
                </AnalyticsCard>
            </div>

            {/* yearly attendance chart */}
            <AnalyticsCard title={t("analytics.yearly")} subtitle={t("analytics.yearlySubtitle")} state={yearly}>
                {(data) => <YearlyAttendanceBlock {...data} />}
            </AnalyticsCard>
        </div>
    )
}
