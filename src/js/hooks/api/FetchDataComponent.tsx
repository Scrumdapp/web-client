import {ScrumdappApi} from "./scrumdappApi.ts";
import RequestProcessor = ScrumdappApi.RequestProcessor;
import type {ReactNode} from "react";
import {ApiError} from "./apiError.ts";
import {useApi} from "./useApi.ts";
import {useEffect} from "react";
import {LoadScreen} from "../../../components/generic/LoadScreen.tsx";
import {ErrorScreen} from "../../../components/generic/ErrorScreen.tsx";

export function useApiComponent<TInput extends any[], TResult>(processor: RequestProcessor<TInput, TResult>) {
    return ({input, loading, error, children}: {
        input: TInput
        loading?: ReactNode
        error?: (error: ApiError) => ReactNode
        children: (data: TResult) => ReactNode
    }) => {
        const apiRequester = useApi(processor)

        useEffect(() => {
            apiRequester.runCommand(...input)
        }, [apiRequester.runCommand])

        if (apiRequester.loading) {
            return loading ?? <LoadScreen />
        }

        if (apiRequester.error) {
            return error ? error(apiRequester.error) : <ErrorScreen error={apiRequester.error}/>;
        }

        if (apiRequester.data == null) {
            const apiError = new ApiError(200, "No data was provided")
            return error ? error(apiError) : <ErrorScreen error={apiError}/>;
        }

        return children(apiRequester.data)
    }
}

export function TestFetchData() {
    const GetGroupDataApiComponent = useApiComponent(ScrumdappApi.getGroupData())

    return (<>
        <GetGroupDataApiComponent input={[0]}>
            {(data) =>
                <div>
                    <p>{data.id}</p>
                    <p>{data.name}</p>
                </div>
            }
        </GetGroupDataApiComponent>
    </>)
}