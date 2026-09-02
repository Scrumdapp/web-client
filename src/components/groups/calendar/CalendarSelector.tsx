import { memo } from "react"
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi"
import { useApiComponent } from "../../../js/hooks/api/useApiComponent"
import { useGroup } from "../../../js/context/group/useGroup"
import { Link } from "react-router-dom"
import { getYearMonth, nextMonth, parseMonthText, parseYearMonth, previousMonth } from "../../../js/utils/timeUtils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next";

export const CalendarSelector = memo(({ currentYearMonth }: { currentYearMonth: string }) => {
    const { t } = useTranslation();
    const ym = parseYearMonth(currentYearMonth)
    const group = useGroup()
    const GetMonthsComponent = useApiComponent(ScrumdappApi.getCheckpointMonths())

    const monthLabel = (date: Date) => {
        const key = parseMonthText(date.getUTCMonth())
        return key ? t(key) : ""
    }

    return (
        <div className="horizontal">
            <GetMonthsComponent input={[group.id]}>
                {(months) => (<>
                    <div className="flex-1 flex justify-start">
                        {months.some(it => it == getYearMonth(previousMonth(ym)))
                            ? (
                                <Link className="btn" to={`/groups/${group.id}/calendar?month=${getYearMonth(previousMonth(ym))}`}>
                                    <FontAwesomeIcon icon={faArrowLeft} className="text-blue" />
                                    {monthLabel(previousMonth(ym))}
                                </Link>
                            ) : (
                                <span className="btn pointer-events-none text-gray!">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    {monthLabel(previousMonth(ym))}
                                </span>
                            )
                        }
                    </div>
                    <div className="flex-2 flex justify-center items-center">
                        <div className="dropdown flex btn border w-32">
                            {monthLabel(ym)}
                            <div className="flex-1" />
                            <FontAwesomeIcon icon={faChevronDown} />
                            <div className="dropdown-content w-32">
                                <div className="vertical gap-2">
                                    {months.map((m) => (
                                        <Link key={m} className="btn text-left! justify-start!" to={`/groups/${group.id}/calendar?month=${m}`}>
                                            {monthLabel(parseYearMonth(m))}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                        {months.some(it => it == getYearMonth(nextMonth(ym)))
                            ? (
                                <Link className="btn" to={`/groups/${group.id}/calendar?month=${getYearMonth(nextMonth(ym))}`}>
                                    {monthLabel(nextMonth(ym))}
                                    <FontAwesomeIcon icon={faArrowRight} className="text-blue" />
                                </Link>
                            ) : (
                                <span className="btn pointer-events-none text-gray!">
                                    {monthLabel(nextMonth(ym))}
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            )
                        }
                    </div>
                </>)}
            </GetMonthsComponent>
        </div >
    )
})