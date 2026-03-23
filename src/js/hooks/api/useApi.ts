import {ScrumdappApi} from "./scrumdappApi.ts";
import RequestProcessor = ScrumdappApi.RequestProcessor;
import {useCallback, useState} from "react";
import {ApiError} from "./apiError.ts";

export function useApi<Ti extends any[], Tr>(processor: RequestProcessor<Ti, Tr>) {
    const [data, setData] = useState<Tr | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<ApiError | null>(null)

    const command = useCallback((...params: Ti) => {
        setData(null)
        setError(null)
        setLoading(true)
        return processor(...params)
            .then((it) => {
                setData(it)
                return it
            })
            .catch((error) => {
                if (error instanceof ApiError) {
                    setError(error)
                } else {
                    console.log(error)
                }
                throw error
            })
            .finally(() => {
                setLoading(false)
            })
    }, [processor.id])

    return {
        loading,
        data,
        error,
        runCommand: command
    }
}