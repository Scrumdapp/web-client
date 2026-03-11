import type {ApiError} from "../../js/hooks/api/apiError.ts";

export function ErrorScreen({error}: {error: ApiError}) {
    return (
        <div>
            <h2>Error: {error.status}</h2>
            <p>{error.message}</p>
            <p>{error.detail}</p>
        </div>
    )
}