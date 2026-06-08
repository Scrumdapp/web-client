import type { ApiError } from "../../js/hooks/api/apiError.ts";

export function ErrorScreen({ error }: { error: ApiError }) {
    return (
        <div className="center fade-in">
            {error.status == 999 ? (
                <h2>Error!</h2>
            ) : (
                <h2>Error: <strong>{error.status}</strong></h2>
            )}
            <p>{error.message}</p>
            <p>{error.detail}</p>
        </div>
    )
}
