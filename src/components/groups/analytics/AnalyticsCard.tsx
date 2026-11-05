import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { LoadScreen } from "../../generic/LoadScreen.tsx"
import { ErrorScreen } from "../../generic/ErrorScreen.tsx"
import type { ApiError } from "../../../js/hooks/api/apiError.ts"

interface AnalyticsCardProps<T> {
    title: ReactNode
    subtitle: string
    actions?: ReactNode
    state: { data: T | null, error: ApiError | null, retry: () => void }
    children: (data: T) => ReactNode
}

// Card with title and subtitle; the body shows loading/error until the data is there
export function AnalyticsCard<T>({ title, subtitle, actions, state, children }: AnalyticsCardProps<T>) {
    return (
        <div className="card flex-1 vertical" aria-busy={state.data == null && state.error == null}>
            <div className="horizontal flex-wrap justify-between items-center gap-2.5 mb-4">
                <div>
                    <h4 className="horizontal items-center gap-2">{title}</h4>
                    <p className="muted">{subtitle}</p>
                </div>
                {actions}
            </div>
            <CardBody state={state}>{children}</CardBody>
        </div>
    )
}

function CardBody<T>({ state: { data, error, retry }, children }: Pick<AnalyticsCardProps<T>, "state" | "children">) {
    const { t } = useTranslation()
    if (error) {
        return (
            <div className="center min-h-40 gap-3">
                <ErrorScreen error={error} />
                <button type="button" className="btn btn-secondary" onClick={retry}>{t("analytics.retry")}</button>
            </div>
        )
    }
    if (data == null) return <div className="center min-h-40"><LoadScreen /></div>
    return children(data)
}

// Color legend of a chart, e.g. "yes/no/unknown"
export function Legend({ items, className = "" }: { items: { label: string, color: string, icon?: string }[], className?: string }) {
    return (
        <div className={`horizontal flex-wrap gap-3 ${className}`}>
            {items.map(({ label, color, icon }) => (
                <div className="horizontal items-center gap-1.5 text-xs text-fg4" key={label}>
                    <span className="size-2.5 flex-none rounded-sm" style={{ backgroundColor: color }} />
                    {icon && <span aria-hidden="true">{icon}</span>}
                    {label}
                </div>
            ))}
        </div>
    )
}
