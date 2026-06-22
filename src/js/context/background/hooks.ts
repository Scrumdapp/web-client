import {useContext, useEffect, useState} from "react";
import {BackgroundChangedEvent, backgroundContext, BackgroundContext} from "./backgroundContext";

export function useBackgroundContext(): BackgroundContext {
    const ctx = useContext(backgroundContext)
    if (!ctx) {
        console.error("Warning! Background context was not set, make it is provided by BackgroundProvider")
    }

    // @ts-ignore
    return ctx
}

export function useCurrentBackground(): string | null {
    const ctx = useBackgroundContext()
    const [currentBackground, setCurrentBackground] = useState(ctx.currentBackground)

    useEffect(() => {

        const fn = (e: Event) => {
            if (e instanceof BackgroundChangedEvent) {
                setCurrentBackground(e.background)
            }
        }

        ctx.addEventListener(BackgroundChangedEvent.eventName, fn)
        return () => ctx.removeEventListener(BackgroundChangedEvent.eventName, fn)
    }, [ctx])

    return currentBackground
}