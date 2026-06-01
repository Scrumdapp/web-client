import {useCallback, useEffect, useState} from "react";
import {ApiError} from "./apiError.ts";
import {RequestProcessor} from "./apiUtils.ts";

export interface UseApiReturnType<TInput extends any[], Tm> {
    loading: boolean,
    data: Tm | null,
    error: ApiError | null,
    runCommand: (...params: TInput) => Promise<Tm>
}

export interface UseApiOptions<Ti extends any[], Tr, Tm> {
    mapper?: (input: Tr) => Tm,
    fetchOnCreated?: Ti,
}

export function useApi<Ti extends any[], Tr, Tm = Tr>(
    processor: RequestProcessor<Ti, Tr>,
    options: UseApiOptions<Ti, Tr, Tm> = {}
) {

    const [data, setData] = useState<Tm | null>(null)
    const [loading, setLoading] = useState<boolean>(options.fetchOnCreated ? true : false)
    const [error, setError] = useState<ApiError | null>(null)

    const command = useCallback((...params: Ti) => {
        setData(null)
        setError(null)
        setLoading(true)
        return processor(...params)
            .then((it) => {
                // @ts-ignore
                const d = (options.mapper ? options.mapper(it) : it) as Tm
                setData(d)
                return d
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

    if (options.fetchOnCreated) {
        useEffect(() => {
            command(...options.fetchOnCreated!)
        }, [processor.id, ...(options.fetchOnCreated!)])
    }

    return {
        loading,
        data,
        error,
        runCommand: command
    } as UseApiReturnType<Ti, Tm>
}