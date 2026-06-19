import {useContext} from "react";
import {backgroundContext, BackgroundContextState} from "./backgroundContext.ts";

export function useBackground(): BackgroundContextState {
    const ctx = useContext(backgroundContext)
    if (!ctx?.background) {
        console.error("Warning! Background context was not set, make it is provided by BackgroundProvider")
    }

    // @ts-ignore
    return ctx
}