import { JSX, ReactNode, useEffect, useCallback, useState } from "react";
import { ApiError } from "./apiError.ts";
import { useApi } from "./useApi.ts";
import { LoadScreen } from "../../../components/generic/LoadScreen.tsx";
import { ErrorScreen } from "../../../components/generic/ErrorScreen.tsx";
import { RequestProcessor } from "./apiUtils.ts";

export function useApiComponent<TInput extends any[], TResult>(processor: RequestProcessor<TInput, TResult>) {
    const [updateState, setUpdateState] = useState(0)

    const component = useCallback(({ input, loading, error, children }: {
        input: TInput
        loading?: ReactNode
        error?: (error: ApiError) => ReactNode
        children: (data: TResult) => ReactNode | JSX.Element
    }) => {
        const apiRequester = useApi(processor)

        useEffect(() => {
            apiRequester.runCommand(...input)
        }, [processor.id])

        if (apiRequester.loading) {
            return loading ?? <LoadScreen />
        }

        if (apiRequester.error) {
            return error ? error(apiRequester.error) : <ErrorScreen error={apiRequester.error} />;
        }

        if (apiRequester.data == null) {
            const apiError = new ApiError(200, "No data was provided")
            return error ? error(apiError) : <ErrorScreen error={apiError} />;
        }

        return children(apiRequester.data)
    }, [processor.id, updateState])

    type ApiComponent = (typeof component) & { refresh: () => void }

    // @ts-ignore
    component.refresh = () => {
        setUpdateState(it => it + 1)
    }

    return component as ApiComponent;
}
