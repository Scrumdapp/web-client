import {useCallback, useState} from "react";

export function useUpdate() {
    const [ _, setState ] = useState(0)
    return useCallback(() => {
        setState(it => it + 1)
    }, []);
}